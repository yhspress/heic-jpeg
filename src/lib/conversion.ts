export const MAX_INPUT_BYTES = 30 * 1024 * 1024;
export const MAX_PIXELS = 50_000_000;

export function identifyImage(bytes: Uint8Array): "JPEG" | "HEIC" | "HEIF" | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "JPEG";
  if (bytes.length < 16 || String.fromCharCode(...bytes.slice(4, 8)) !== "ftyp") return null;
  const boxSize = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0);
  if (boxSize < 16 || boxSize > bytes.length || boxSize % 4 !== 0) return null;
  const brands: string[] = [];
  for (let offset = 8; offset + 4 <= boxSize; offset += 4) {
    if (offset !== 12) brands.push(String.fromCharCode(...bytes.slice(offset, offset + 4)));
  }
  if (brands.some((brand) => ["avif", "avis"].includes(brand))) return null;
  if (brands.some((brand) => ["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs"].includes(brand))) return "HEIC";
  return brands.some((brand) => ["mif1", "msf1"].includes(brand)) ? "HEIF" : null;
}

export function inspectJpeg(bytes: Uint8Array) {
  if (identifyImage(bytes) !== "JPEG") throw new Error("JPEGデータを確認できませんでした。");
  let offset = 2;
  while (offset + 4 < bytes.length) {
    if (bytes[offset++] !== 0xff) break;
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    const size = (bytes[offset] << 8) | bytes[offset + 1];
    if (size < 2 || offset + size > bytes.length) break;
    if ([0xc0, 0xc1, 0xc2].includes(marker) && size >= 8) return { height: (bytes[offset + 3] << 8) | bytes[offset + 4], width: (bytes[offset + 5] << 8) | bytes[offset + 6], components: bytes[offset + 7] };
    offset += size;
  }
  throw new Error("JPEGの画像サイズを確認できませんでした。");
}

export const formatBytes = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;

async function decode(blob: Blob): Promise<ImageBitmap> {
  try { return await createImageBitmap(blob, { imageOrientation: "from-image", colorSpaceConversion: "default" }); }
  catch { const { heicTo } = await import("heic-to"); return heicTo({ blob, type: "bitmap" }); }
}

export async function convertPhoto(file: File) {
  if (file.size > MAX_INPUT_BYTES) throw new Error("この写真は30 MBを超えています。端末のメモリを保護するため、30 MB以下の写真を選択してください。");
  const format = identifyImage(new Uint8Array(await file.slice(0, 4096).arrayBuffer()));
  if (format === "JPEG") throw new Error("この写真はすでにJPEG形式です。変換は不要です。申請前に容量・サイズと写真の内容をご確認ください。");
  if (!format) throw new Error("HEIC・HEIFのデータを確認できませんでした。拡張子の変更では変換できません。iPhoneで撮影した元の写真を選択してください。");
  const bitmap = await decode(file);
  const canvas = document.createElement("canvas");
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > MAX_PIXELS) throw new Error("この写真は処理できる画像サイズ（5,000万画素まで）を超えています。iPhoneの写真アプリなどでサイズを調整してください。");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d", { colorSpace: "srgb", alpha: false });
    if (!context) throw new Error("このブラウザでは画像を作成できません。");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0);
    const jpeg = await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("JPEGを作成できませんでした。")), "image/jpeg", 0.92));
    const info = inspectJpeg(new Uint8Array(await jpeg.arrayBuffer()));
    if (info.components !== 3 || info.width !== bitmap.width || info.height !== bitmap.height) throw new Error("出力画像を検証できませんでした。");
    const converted = new File([jpeg], `${file.name.replace(/\.[^.]+$/, "") || "photo"}.jpg`, { type: "image/jpeg" });
    return { file: converted, originalBytes: file.size, format, ...info };
  } finally { bitmap.close(); canvas.width = 0; canvas.height = 0; }
}
