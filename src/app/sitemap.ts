import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { guides } from "@/content/site-content";
export const dynamic = "force-static";
const paths = ["", "/about", "/privacy", "/terms", "/contact", "/disclaimer", "/file-privacy", "/sources", "/guides", ...guides.map(g => `/guides/${g.slug}`)];
export default function sitemap(): MetadataRoute.Sitemap { return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date("2026-09-22") })); }
