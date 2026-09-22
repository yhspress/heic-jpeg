"use client";
import { useEffect, useRef, useState } from "react";
import { mynumberRequirements as req } from "@/config/mynumberRequirements";
import { convertPhoto, formatBytes } from "@/lib/conversion";
type Result = Awaited<ReturnType<typeof convertPhoto>> & { url: string };

export function HeicConverter() {
  const input = useRef<HTMLInputElement>(null);
  const locked = useRef(false);
  const mounted = useRef(true);
  const objectUrl = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); };
  }, []);
  function clearResult() {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    setResult(null);
  }
  async function convert(file?: File) {
    if (!file || locked.current) return;
    locked.current = true;
    clearResult(); setError(""); setBusy(true); setSlow(false);
    const timer = window.setTimeout(() => { if (mounted.current) setSlow(true); }, 30_000);
    try {
      const photo = await convertPhoto(file);
      if (!mounted.current) return;
      const url = URL.createObjectURL(photo.file);
      objectUrl.current = url;
      setResult({ ...photo, url });
    } catch (cause) {
      if (mounted.current) setError(cause instanceof Error && /[ぁ-んァ-ヶ一-龠]/.test(cause.message) ? cause.message : "変換できませんでした。ファイルが壊れているか、対応していないHEIC形式の可能性があります。元の写真を選び直すか、最新版のSafari・Chromeでお試しください。");
    } finally {
      window.clearTimeout(timer); locked.current = false;
      if (mounted.current) { setBusy(false); setSlow(false); }
    }
  }
  const checks = result ? [
    { name: "JPEG形式", pass: true, detail: "出力データを確認済み" },
    { name: "カラー出力", pass: result.components === 3, detail: "sRGBで描画した3成分JPEG（一般的な保存方式はYCbCr）" },
    { name: "画像サイズ", pass: result.width >= req.widthMin && result.width <= req.widthMax && result.height >= req.heightMin && result.height <= req.heightMax, detail: `縦・横ともに${req.widthMin}〜${req.widthMax} px` },
    { name: "ファイル容量", pass: result.file.size >= req.minBytes && result.file.size <= req.maxBytes, detail: `${formatBytes(req.minBytes)}〜${formatBytes(req.maxBytes)}` },
  ] : [];
  return <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8" aria-labelledby="converter-title" aria-busy={busy}>
    <h2 id="converter-title" className="sr-only">HEICからJPEGへの変換</h2>
    <input ref={input} className="sr-only" tabIndex={-1} aria-label="変換するHEIC写真" type="file" accept=".heic,.heif,image/heic,image/heif" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; void convert(file); }} />
    {!result && <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (event.dataTransfer.files.length > 1) { if (!locked.current) setError("写真は1枚ずつ選択してください。"); return; } void convert(event.dataTransfer.files[0]); }} className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 px-5 py-10 text-center">
      <p className="font-medium">申請に使いたいHEIC写真を選んでください</p><p className="mt-2 text-sm text-slate-600">ここにドラッグ＆ドロップ、またはボタンから選択できます。</p>
      <button type="button" disabled={busy} onClick={() => input.current?.click()} className="mt-5 rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-wait disabled:bg-blue-400">{busy ? "変換中…" : "HEIC写真を選択"}</button>
      <p className="mt-4 text-xs text-slate-600">HEIC・HEIF／1枚30 MBまで。大きな写真は端末によって処理できない場合があります。</p>
    </div>}
    <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-600">{busy ? slow ? "処理に時間がかかっています。このページを開いたままお待ちください。端末が応答しない場合はページを再読み込みしてください。" : "変換中… 写真の大きさによって時間がかかることがあります。" : result ? "JPEGへの変換が完了しました。" : "写真はブラウザ内で処理され、サーバーにはアップロードされません。"}</p>
    {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {result && <div className="mt-5 space-y-5">
      <div className="rounded-xl bg-emerald-50 p-4 text-emerald-900"><p className="font-bold">JPEG形式に変換しました。</p><p className="mt-1 text-sm">ダウンロード前に、写真の向きとファイル条件をご確認ください。</p></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={result.url} alt="変換後の写真。顔と上下の向きを確認してください。" width={result.width} height={result.height} className="mx-auto max-h-80 w-auto max-w-full rounded-lg object-contain" />
      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">{[["元の形式", result.format], ["変換後", "JPEG"], ["元の容量", formatBytes(result.originalBytes)], ["変換後の容量", formatBytes(result.file.size)], ["画像サイズ", `${result.width} × ${result.height} px`]].map(([name, value]) => <div key={name}><dt className="text-slate-500">{name}</dt><dd className="font-medium">{value}</dd></div>)}</dl>
      <div className="rounded-lg border border-slate-200 p-4"><h3 className="font-bold">申請用ファイルの確認</h3><ul className="mt-3 space-y-2 text-sm">{checks.map((check) => <li key={check.name}><span aria-hidden="true">{check.pass ? "✓ " : "! "}</span><b>{check.name}：</b>{check.pass ? "確認済み" : "要確認"}<span className="text-slate-600">（{check.detail}）</span></li>)}</ul>
        {!checks.every((check) => check.pass) && <p className="mt-3 text-sm text-amber-800">変換は完了しましたが、容量または画像サイズの調整が必要です。このツールは自動で縮小しません。</p>}
        <p className="mt-3 text-xs text-slate-600">写真の内容・背景・顔の位置は判定していません。申請の受理を保証するものではありません。<a className="text-blue-700 underline" href={req.officialSourceUrl} target="_blank" rel="noreferrer">公式案内を確認する（別タブ）</a></p>
      </div>
      <p className="text-sm text-slate-600">元の画素数を保ち、JPEG品質92%で保存しました。位置情報・撮影日時など、元のメタデータは引き継ぎません。連写など複数画像を含むファイルは1枚のみ変換します。</p>
      <a href={result.url} download={result.file.name} className="inline-flex rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800">JPEGをダウンロード</a><button type="button" onClick={clearResult} className="ml-3 text-sm text-blue-700 underline">別の写真を変換</button>
    </div>}
  </section>;
}
