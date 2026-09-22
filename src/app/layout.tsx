import type { Metadata } from "next";
import "./globals.css";
import { ADSENSE_PUBLISHER_ID, SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/config/site";
import { StructuredData } from "@/components/StructuredData";
import { OptionalServices } from "@/components/OptionalServices";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "マイナンバーカード写真 HEIC→JPEG変換｜iPhone写真対応", template: "%s｜HEIC JPEG" },
  description: SITE_DESCRIPTION, alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, url: SITE_URL, title: "マイナンバーカード写真 HEIC→JPEG変換", description: SITE_DESCRIPTION, images: [{url:"/og.png",width:1200,height:630}] },
  twitter: {card:"summary_large_image",images:["/og.png"]},
  robots: { index: true, follow: true, googleBot: {index:true,follow:true,"max-image-preview":"large","max-snippet":-1} },
  other: ADSENSE_PUBLISHER_ID ? {"google-adsense-account":ADSENSE_PUBLISHER_ID} : {},
  verification: {google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined}
  ,icons: {icon:"/icon.svg"}
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body><a href="#main" className="skip-link">本文へ移動</a><Header /><main id="main">{children}</main><Footer /><OptionalServices /><StructuredData data={{"@context":"https://schema.org","@type":"WebSite",name:SITE_NAME,url:SITE_URL,inLanguage:"ja",description:SITE_DESCRIPTION}}/></body></html>; }
