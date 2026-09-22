import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".wasm": "application/wasm" };
const isFile = async (path) => { try { return (await stat(path)).isFile(); } catch { return false; } };
createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    if (pathname.includes("\0") || pathname.includes("\\") || pathname.split("/").includes("..")) { response.writeHead(400).end(); return; }
    const base = resolve(root, `.${pathname}`);
    if (base !== root && !base.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    let file;
    for (const candidate of [base, `${base}.html`, resolve(base, "index.html")]) {
      if ((candidate === root || candidate.startsWith(root + sep)) && await isFile(candidate)) { file = candidate; break; }
    }
    const status = file ? 200 : 404;
    file ??= resolve(root, "404.html");
    if (!await isFile(file)) { response.writeHead(404).end("Not found"); return; }
    response.writeHead(status, { "Content-Type": types[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store" });
    if (request.method === "HEAD") { response.end(); return; }
    createReadStream(file).on("error", () => response.destroy()).pipe(response);
  } catch { response.writeHead(400).end("Bad request"); }
}).listen(4173, "127.0.0.1", () => console.log("Static preview: http://127.0.0.1:4173"));
