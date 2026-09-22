import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { StructuredData } from "@/components/StructuredData";
import { guides, OFFICIAL_PHOTO_SOURCE_URL, APPLE_HEIF_SOURCE_URL } from "@/content/site-content";
import { SITE_NAME, SITE_URL, UPDATED_DATE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {
  const {slug} = await params; const guide = guides.find(g => g.slug === slug);
  if (!guide) return {}; return pageMetadata(guide.title, guide.description, `/guides/${slug}`);
}
export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params; const guide = guides.find(g => g.slug === slug); if (!guide) notFound();
  const url = `${SITE_URL}/guides/${slug}`;
  return <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
    <nav aria-label="パンくずリスト" className="mb-7 flex flex-wrap gap-2 text-sm text-slate-600"><Link href="/">ホーム</Link><span>/</span><Link href="/guides">写真ガイド</Link></nav>
    <p className="eyebrow">申請前の写真ガイド</p><h1 className="mt-3 text-3xl font-bold leading-relaxed sm:text-4xl">{guide.title}</h1>
    <p className="mt-5 text-lg leading-8 text-slate-600">{guide.description}</p><p className="mt-5 text-xs text-slate-500">編集：heic-jpeg.com 運営者 · 更新日 <time dateTime={UPDATED_DATE}>{UPDATED_DATE}</time></p>
    <nav aria-label="目次" className="my-9 rounded-xl border border-slate-200 bg-white p-6"><h2 className="font-bold">この記事でわかること</h2><ol className="mt-3 list-inside list-decimal space-y-2 text-sm">{guide.sections.map((s,i)=><li key={s.heading}><a href={`#section-${i+1}`} className="text-blue-800 underline">{s.heading}</a></li>)}</ol></nav>
    {guide.sections.map((s,i)=><div key={s.heading}><section id={`section-${i+1}`} className="mb-10 scroll-mt-6"><h2 className="text-2xl font-bold leading-relaxed">{s.heading}</h2>{s.paragraphs.map(p=><p key={p} className="mt-4 leading-8 text-slate-700">{p}</p>)}</section>{i===1&&<AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE}/>}</div>)}
    {guide.faq && <section className="my-10"><h2 className="text-2xl font-bold">よくある質問</h2>{guide.faq.map(f=><div key={f.question} className="mt-5 rounded-xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{f.question}</h3><p className="mt-3 leading-7 text-slate-700">{f.answer}</p></div>)}</section>}
    <section className="rounded-xl bg-slate-100 p-6 text-sm leading-7"><h2 className="font-bold">参照した公式情報</h2><ul className="mt-2 space-y-2"><li><a href={OFFICIAL_PHOTO_SOURCE_URL} className="text-blue-800 underline">マイナンバーカード総合サイト：写真データの条件</a></li><li><a href="https://www.kojinbango-card.go.jp/apprec/apply/facephoto/" className="text-blue-800 underline">顔写真のチェックポイント</a></li><li><a href={APPLE_HEIF_SOURCE_URL} className="text-blue-800 underline">Apple：HEIF／HEVCメディアの扱い方</a></li></ul><p className="mt-3">確認日：{UPDATED_DATE}。申請条件は変更されることがあります。当サイトは公的機関の公式サービスではありません。</p></section>
    <div className="mt-10 rounded-xl bg-blue-50 p-6"><h2 className="text-xl font-bold">写真の形式で止まってしまったら</h2><p className="mt-3 leading-7">元のHEIC写真を選んで、JPEGとして保存できます。</p><Link href="/" className="mt-4 inline-block font-bold text-blue-800 underline">HEICをJPEGに変換する →</Link></div>
    <nav aria-label="関連記事" className="mt-10"><h2 className="font-bold">あわせて読みたい</h2><ul className="mt-3 space-y-3">{guides.filter(g=>g.slug!==slug).slice(0,3).map(g=><li key={g.slug}><Link href={`/guides/${g.slug}`} className="text-blue-800 underline">{g.title}</Link></li>)}</ul></nav>
    <StructuredData data={{"@context":"https://schema.org","@type":"Article", headline:guide.title,description:guide.description,inLanguage:"ja",dateModified:UPDATED_DATE,datePublished:UPDATED_DATE,mainEntityOfPage:url,author:{"@type":"Organization",name:"heic-jpeg.com 運営者",url:`${SITE_URL}/about`},publisher:{"@type":"Organization",name:SITE_NAME,url:SITE_URL},citation:[OFFICIAL_PHOTO_SOURCE_URL,APPLE_HEIF_SOURCE_URL]}}/>
    <StructuredData data={{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"ホーム",item:SITE_URL},{"@type":"ListItem",position:2,name:"写真ガイド",item:`${SITE_URL}/guides`},{"@type":"ListItem",position:3,name:guide.title,item:url}]}}/>
  </article>;
}
