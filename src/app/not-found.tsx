import Link from "next/link";
export default function NotFound(){return <div className="mx-auto max-w-3xl px-5 py-20"><p className="eyebrow">404</p><h1 className="mt-3 text-3xl font-bold">ページが見つかりません</h1><p className="mt-5">URLが変更されたか、入力に誤りがある可能性があります。</p><Link href="/" className="mt-6 inline-block text-blue-800 underline">写真変換のトップページへ</Link></div>}
