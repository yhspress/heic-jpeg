import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/config/site";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: `${SITE_URL}${path}`, siteName: SITE_NAME, locale: "ja_JP", type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title, description, images: ["/og.png"] } };
}
