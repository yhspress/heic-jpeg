import { afterEach, describe, expect, it, vi } from "vitest";
import { identifyImage, inspectJpeg, convertPhoto, MAX_INPUT_BYTES } from "./conversion";
const ftyp = (major: string, compatible: string) => new Uint8Array([0, 0, 0, 20, ...Array.from(`ftyp${major}\0\0\0\0${compatible}`, (c) => c.charCodeAt(0))]);
afterEach(() => vi.unstubAllGlobals());
describe("file signature validation", () => {
  it("detects HEIC and generic HEIF without trusting file extensions", () => {
    expect(identifyImage(ftyp("heic", "mif1"))).toBe("HEIC");
    expect(identifyImage(ftyp("mif1", "mif1"))).toBe("HEIF");
    expect(identifyImage(ftyp("avif", "mif1"))).toBeNull();
    expect(identifyImage(new TextEncoder().encode("fake.heic"))).toBeNull();
  });
  it("rejects truncated ftyp and identifies JPEG", () => {
    expect(identifyImage(ftyp("heic", "mif1").slice(0, 18))).toBeNull();
    expect(identifyImage(new Uint8Array([255, 216, 255, 224]))).toBe("JPEG");
  });
  it("explains JPEG input and oversized input before decoding", async () => {
    await expect(convertPhoto(new File([new Uint8Array([255, 216, 255, 224])], "photo.heic"))).rejects.toThrow("すでにJPEG");
    await expect(convertPhoto({ size: MAX_INPUT_BYTES + 1 } as File)).rejects.toThrow("30 MB");
    await expect(convertPhoto(new File(["invalid"], "photo.heic"))).rejects.toThrow("データを確認");
  });
});
describe("conversion lifecycle", () => {
  it("preserves dimensions, uses sRGB and strips source metadata through canvas encoding", async () => {
    const close = vi.fn();
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 640, height: 480, close }));
    const context = { fillStyle: "", fillRect: vi.fn(), drawImage: vi.fn() };
    const jpeg = new Blob([new Uint8Array([255,216,255,192,0,17,8,1,224,2,128,3,1,17,0,2,17,1,3,17,1,255,217])], { type: "image/jpeg" });
    const canvas = { width: 0, height: 0, getContext: vi.fn().mockReturnValue(context), toBlob: vi.fn((callback: (blob: Blob) => void) => callback(jpeg)) };
    vi.stubGlobal("document", { createElement: () => canvas });
    const result = await convertPhoto(new File([ftyp("heic", "mif1")], "photo.heic"));
    expect(result).toMatchObject({ width: 640, height: 480, format: "HEIC", components: 3 });
    expect(result.file.name).toBe("photo.jpg");
    expect(canvas.getContext).toHaveBeenCalledWith("2d", { colorSpace: "srgb", alpha: false });
    expect(canvas.toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.92);
    expect(close).toHaveBeenCalledOnce();
    expect(canvas.width).toBe(0);
  });
  it("releases decoded images above the pixel limit", async () => {
    const close = vi.fn();
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 10000, height: 10000, close }));
    vi.stubGlobal("document", { createElement: () => ({ width: 0, height: 0 }) });
    await expect(convertPhoto(new File([ftyp("heic", "mif1")], "large.heic"))).rejects.toThrow("5,000万画素");
    expect(close).toHaveBeenCalledOnce();
  });
});
describe("JPEG output inspection", () => {
  it("reads dimensions and component count from encoded bytes", () => {
    expect(inspectJpeg(new Uint8Array([255,216,255,192,0,17,8,1,224,2,128,3,1,17,0,2,17,1,3,17,1,255,217]))).toEqual({ width: 640, height: 480, components: 3 });
  });
  it("rejects truncated and non-JPEG output", () => {
    expect(() => inspectJpeg(new Uint8Array([255,216,255,192,0,17,8]))).toThrow();
    expect(() => inspectJpeg(new Uint8Array([1,2,3]))).toThrow();
  });
});
