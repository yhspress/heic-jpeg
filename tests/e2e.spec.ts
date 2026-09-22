import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { inspectJpeg } from "../src/lib/conversion";

const routes = ["/", "/about", "/privacy", "/terms", "/contact", "/disclaimer", "/file-privacy", "/sources", "/guides", "/guides/what-is-heic", "/guides/mynumber-heic-jpeg", "/guides/iphone-save-jpeg", "/guides/photo-size-and-quality", "/guides/conversion-troubleshooting", "/guides/photo-privacy"];

test("real HEIC becomes a downloadable metadata-free JPEG without uploading photos", async ({ page }, testInfo) => {
  const uploads: string[] = [];
  page.on("request", (request) => { if (["POST", "PUT", "PATCH"].includes(request.method())) uploads.push(request.url()); });
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles(path.resolve("tests/fixtures/example.heic"));
  await expect(page.getByRole("status")).toHaveText("JPEGへの変換が完了しました。", { timeout: 90_000 });
  await expect(page.getByAltText("変換後の写真。顔と上下の向きを確認してください。")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("conversion-result-desktop.png"), fullPage: true });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "JPEGをダウンロード", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("example.jpg");
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  const jpeg = await readFile(downloadPath!);
  const info = inspectJpeg(jpeg);
  expect(info.width).toBeGreaterThan(0);
  expect(info.height).toBeGreaterThan(0);
  expect(info.components).toBe(3);
  // EXIF (including GPS) is carried in APP1; pixel-only canvas output must not copy it.
  let offset = 2;
  while (offset + 4 < jpeg.length) {
    expect(jpeg[offset++]).toBe(0xff);
    while (jpeg[offset] === 0xff) offset++;
    const marker = jpeg[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    expect(marker, "No source EXIF/XMP APP1 metadata").not.toBe(0xe1);
    const length = jpeg.readUInt16BE(offset);
    expect(length).toBeGreaterThanOrEqual(2);
    offset += length;
  }
  expect(uploads).toEqual([]);
  await page.getByRole("button", { name: "別の写真を変換" }).click();
  await expect(page.getByRole("button", { name: "HEIC写真を選択", exact: true })).toBeVisible();
});

test("rejects corrupt HEIC, recognizes JPEG despite its extension, and permits same-file retry", async ({ page }) => {
  await page.goto("/");
  const input = page.locator('input[type="file"]');
  const corrupt = { name: "broken.heic", mimeType: "image/heic", buffer: Buffer.from("not an image") };
  await input.setInputFiles(corrupt);
  await expect(page.getByRole("region", { name: "HEICからJPEGへの変換" }).getByRole("alert")).toContainText("データを確認できません");
  await input.setInputFiles(corrupt);
  await expect(page.getByRole("region", { name: "HEICからJPEGへの変換" }).getByRole("alert")).toContainText("データを確認できません");
  await input.setInputFiles({ name: "actually-jpeg.heic", mimeType: "image/heic", buffer: Buffer.from([255, 216, 255, 224]) });
  await expect(page.getByRole("region", { name: "HEICからJPEGへの変換" }).getByRole("alert")).toContainText("すでにJPEG形式");
  await expect(page.getByRole("button", { name: "HEIC写真を選択", exact: true })).toBeEnabled();
});

test("rejects input over 30 MB before attempting decoding", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles({ name: "large.heic", mimeType: "image/heic", buffer: Buffer.alloc(30 * 1024 * 1024 + 1) });
  await expect(page.getByRole("region", { name: "HEICからJPEGへの変換" }).getByRole("alert")).toContainText("30 MBを超えています");
});

test("all 15 Japanese routes have unique canonical, SEO metadata, readable JSON-LD and no mobile overflow", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.locator("h1"), route).toHaveCount(1);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    expect(titles.has(title), `${route}: unique title`).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S.{20,}/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).href).toBe(new URL(route, "https://heic-jpeg.com").href);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\S/);
    const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(structured.length).toBeGreaterThan(0);
    for (const text of structured) expect(JSON.parse(text)["@context"]).toBe("https://schema.org");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
    if (route === "/" || route === "/guides/mynumber-heic-jpeg") await page.screenshot({ path: testInfo.outputPath(route === "/" ? "home-mobile.png" : "guide-mobile.png"), fullPage: true });
  }
});

test("unknown routes return real 404 and the preview does not expose files outside out", async ({ request }) => {
  expect((await request.get("/this-route-does-not-exist")).status()).toBe(404);
  expect((await request.get("/%2e%2e%5cpackage.json")).status()).not.toBe(200);
  expect((await request.get("/package.json")).status()).toBe(404);
  expect((await request.post("/")).status()).toBe(405);
});
