"use client";
import { useOptionalConsent, setOptionalConsent } from "@/lib/consent";
import Script from "next/script";
import Link from "next/link";
import { ADSENSE_PUBLISHER_ID, GA_ID } from "@/config/site";
export function OptionalServices(){
  const choice = useOptionalConsent();
  if(!ADSENSE_PUBLISHER_ID && !GA_ID) return null;
  function choose(value:string){setOptionalConsent(value);if(value==="no")window.location.reload();}
  return <>
    {choice==="yes"&&<>{ADSENSE_PUBLISHER_ID&&<Script async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}/>}
    {GA_ID&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive"/><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}');`}</Script></>}</>}
    {choice===null?<aside aria-label="Cookieの設定" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-xl"><p className="text-sm leading-6">広告・アクセス解析にCookie等を利用してもよろしいですか？拒否しても写真の変換は利用できます。<Link href="/privacy" className="ml-1 text-blue-800 underline">詳細</Link></p><div className="mt-3 flex gap-3"><button onClick={()=>choose("no")} className="rounded-lg border px-4 py-2 text-sm">拒否する</button><button onClick={()=>choose("yes")} className="rounded-lg bg-blue-700 px-4 py-2 text-sm text-white">許可する</button></div></aside>:<div className="bg-white px-5 pb-5 text-center"><button onClick={()=>choose("no")} className="text-xs text-slate-600 underline">広告・解析の許可を取り消す</button></div>}
  </>;
}
