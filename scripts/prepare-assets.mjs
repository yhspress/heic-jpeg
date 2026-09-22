import { mkdir, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";
await mkdir("public/licenses", {recursive:true});
await copyFile("node_modules/heic-to/LICENSE","public/licenses/heic-to.txt");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8fafc"/><rect x="65" y="65" width="1070" height="500" rx="32" fill="white" stroke="#e2e8f0" stroke-width="2"/><rect x="120" y="120" width="64" height="64" rx="15" fill="#1d4ed8"/><text x="135" y="161" font-family="Arial" font-size="25" font-weight="700" fill="white">H→J</text><text x="205" y="162" font-family="Arial" font-size="32" font-weight="700" fill="#172033">HEIC JPEG</text><text x="120" y="275" font-family="Yu Gothic, Meiryo, sans-serif" font-size="44" font-weight="700" fill="#172033">マイナンバーカード用の写真を</text><text x="120" y="365" font-family="Arial" font-size="72" font-weight="700" fill="#1d4ed8">HEIC → JPEG</text><text x="120" y="434" font-family="Yu Gothic, Meiryo, sans-serif" font-size="28" fill="#475569">無料・登録不要・写真のアップロード不要</text><text x="120" y="509" font-family="Arial" font-size="24" fill="#64748b">heic-jpeg.com</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og.png");
const client=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||"";
if(client && !/^ca-pub-\d{16}$/.test(client)) throw new Error("Invalid AdSense client ID");
await writeFile("public/ads.txt",client ? `google.com, ${client.replace("ca-","")}, DIRECT, f08c47fec0942fa0\n` : "# No advertising seller is authorized until an actual AdSense publisher ID is configured.\n");
