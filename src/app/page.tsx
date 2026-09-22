import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { HeicConverter } from "@/components/HeicConverter";
import { StructuredData } from "@/components/StructuredData";
import { mynumberRequirements as req } from "@/config/mynumberRequirements";
import { SITE_URL } from "@/config/site";
import { guides } from "@/content/site-content";
const faq = [
{question:"マイナンバーカードの申請にHEIC写真は使えますか？",answer:"オンライン申請の公式案内ではJPEG（jpg・jpeg）形式が指定され、HEICは不可です。JPEGに変換したうえで、容量・画像サイズ・顔写真の内容を確認してください。"},
{question:"写真はサーバーにアップロードされますか？",answer:"いいえ。変換は端末のブラウザ内で行います。写真のアップロードや保存を行うサーバー機能はありません。"},
{question:"JPEGに変換すれば必ず申請できますか？",answer:"いいえ。ファイル条件に加えて、撮影時期、顔の位置、背景、ピントなどの条件があります。このツールは写真の内容や申請可否を審査しません。"},
{question:"無料で使えますか？登録は必要ですか？",answer:"無料で利用でき、会員登録やログインも不要です。写真は1枚ずつ変換します。"},
{question:"変換したJPEGはiPhoneのどこに保存されますか？",answer:"ブラウザのダウンロード先に保存されます。「ファイル」アプリやブラウザのダウンロード一覧を確認してください。写真アプリに自動で追加されるとは限りません。"},
{question:"HEICからJPEGに変換すると画質は落ちますか？",answer:"JPEGは非可逆圧縮のため、元データと完全には同じになりません。原則としてピクセル数を保ち、高品質で書き出します。保存した写真の向きと鮮明さを確認してください。"}
];
export default function Home(){return <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
<p className="eyebrow">無料 · 登録不要 · ブラウザ内で変換</p>
<h1 className="mt-4 text-3xl font-bold leading-snug tracking-tight sm:text-[2.65rem]">マイナンバーカード用<br className="hidden sm:block"/> HEIC写真を<span className="text-blue-700">JPEG</span>に変換</h1>
<p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">iPhoneのHEIC写真を、申請に使いやすいJPEG形式へ。写真はブラウザ内で処理され、サーバーにはアップロードされません。</p>
<div className="mt-8"><HeicConverter/></div>
<p className="mt-4 text-xs leading-6 text-slate-500">公式サービスではありません。ファイルの変換を補助するツールです。顔写真の審査・申請の代行は行いません。</p>
<section className="mt-12" aria-labelledby="steps"><h2 id="steps" className="text-xl font-bold">申請用の写真を、3つのステップで</h2><ol className="mt-5 grid gap-4 sm:grid-cols-3">{[["写真を選ぶ","元のHEIC・HEIF写真を1枚選択。"],["変換結果を確認","向き、容量、ピクセル数を確認。"],["JPEGを保存","申請画面で保存したJPEGを選択。"]].map(([h,p],i)=><li key={h} className="rounded-xl border border-slate-200 bg-white p-5"><span className="text-xs font-bold text-blue-700">STEP 0{i+1}</span><h3 className="mt-2 font-bold">{h}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{p}</p></li>)}</ol></section>
<section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><p className="eyebrow">公式情報をもとに確認</p><h2 className="mt-2 text-2xl font-bold">オンライン申請のファイル条件</h2><p className="mt-3 text-sm leading-7 text-slate-600">HEICはそのまま提出できません。変換後のJPEGも、次の4点を確認してください。</p><dl className="mt-5 divide-y divide-slate-100">{[["ファイル形式","JPEG（.jpg / .jpeg）"],["カラーモード","RGBカラー"],["ファイル容量","20KB〜7MB"],["画像サイズ","幅・高さともに480〜6000px"]].map(([k,v])=><div key={k} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr]"><dt className="text-sm text-slate-500">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl><p className="mt-4 text-sm leading-7">撮影から6か月以内、正面・無帽・無背景など、写真の内容にも条件があります。</p><p className="mt-3 text-xs leading-6 text-slate-500">確認日：{req.lastVerifiedDate} · 出典：<a href={req.officialSourceUrl} className="text-blue-800 underline">マイナンバーカード総合サイト</a>。最新の案内を優先してください。</p></section>
<AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME}/>
<article className="mt-12 space-y-9">
<section><h2 className="text-2xl font-bold">HEIC形式とは？iPhoneでHEICになる理由</h2><p className="mt-4 leading-8 text-slate-700">HEICは高効率に写真を保存する形式です。iPhoneの「高効率」設定ではHEIF形式で撮影されるため、ファイル名が.heicになることがあります。写真アプリで見えていても、提出先がその形式に対応しているとは限りません。</p><p className="mt-3 leading-8 text-slate-700">拡張子を.jpgに変えるだけではJPEGになりません。このツールは画像データを読み込み、新しいJPEGファイルとして書き出します。</p><Link href="/guides/what-is-heic" className="mt-3 inline-block text-sm text-blue-800 underline">HEICとJPEGの違いを読む →</Link></section>
<section><h2 className="text-2xl font-bold">JPEGに変換するメリット</h2><p className="mt-4 leading-8 text-slate-700">申請画面の指定形式に合わせてファイルを用意できます。元のHEICを上書きしないので、撮影した写真を残したまま、提出用のJPEGを別に保存できます。ただし、変換は顔の位置や背景を整える処理ではありません。</p></section>
<section><h2 className="text-2xl font-bold">画像サイズ・容量と、画質のバランス</h2><p className="mt-4 leading-8 text-slate-700">このツールは原則として元の解像度を保ち、高品質のJPEGで保存します。HEICとJPEGでは圧縮方法が異なるため、変換後に容量が増えることもあります。容量を小さくしすぎると顔の細部が不鮮明になるので、数字だけで判断せず写真を開いて確認してください。</p><Link href="/guides/photo-size-and-quality" className="mt-3 inline-block text-sm text-blue-800 underline">容量が大きい・サイズが合わないとき →</Link></section>
<section><h2 className="text-2xl font-bold">顔写真のプライバシーを守るために</h2><p className="mt-4 leading-8 text-slate-700">写真の処理はお使いのブラウザ内で完結します。出力JPEGには、元写真の位置情報・撮影日時などのEXIFをコピーしません。画像に写っている情報はそのまま残ります。保存したJPEGと元のHEICは、ご自身の端末で管理してください。</p><Link href="/file-privacy" className="mt-3 inline-block text-sm text-blue-800 underline">写真の取り扱いを詳しく見る →</Link></section>
<section><h2 className="text-2xl font-bold">申請直前は、公式案内を確認</h2><p className="mt-4 leading-8 text-slate-700">ファイル条件と顔写真の内容は、分けて確認すると迷いにくくなります。まずJPEG・容量・ピクセル数を確認し、次に公式の適切な写真と不適切な写真の例を見比べてください。</p><a href="https://www.kojinbango-card.go.jp/apprec/apply/facephoto/" className="mt-3 inline-block text-sm text-blue-800 underline">公式「顔写真のチェックポイント」 →</a></section>
</article>
<AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FAQ}/>
<section className="mt-12"><h2 className="text-2xl font-bold">よくある質問</h2><div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">{faq.map(f=><details key={f.question} className="group p-5"><summary className="cursor-pointer font-bold leading-7">{f.question}</summary><p className="mt-3 leading-7 text-slate-600">{f.answer}</p></details>)}</div></section>
<section className="mt-12"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">もう少し詳しく知りたい方へ</h2></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{guides.map(g=><Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300"><h3 className="font-bold leading-7 text-blue-900">{g.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{g.description}</p></Link>)}</div></section>
<StructuredData data={{"@context":"https://schema.org","@type":"WebApplication",name:"HEIC JPEG マイナンバーカード写真変換",url:SITE_URL,applicationCategory:"MultimediaApplication",operatingSystem:"Web browser",inLanguage:"ja",isAccessibleForFree:true,offers:{"@type":"Offer",price:"0",priceCurrency:"JPY"},description:"HEIC・HEIF写真をブラウザ内でJPEGへ変換。写真のアップロード不要。"}}/>
</div>}
