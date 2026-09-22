export const SITE_NAME = "HEIC JPEG｜マイナンバー写真変換";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://heic-jpeg.com").replace(/\/$/, "");
export const CONTACT_EMAIL = "gentlehawaii@gmail.com";
import adsense from "./adsense.json";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? adsense.publisherId;
export const ADSENSE_PUBLISHER_ID = /^ca-pub-\d{16}$/.test(adsenseClient) ? adsenseClient : "";
export const GA_ID = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || "") ? process.env.NEXT_PUBLIC_GA_ID! : "";
export const UPDATED_DATE = "2026-09-22";
export const SITE_DESCRIPTION = "マイナンバーカード申請でHEIC写真が使えないときに。iPhoneのHEIC・HEIFをブラウザ内でJPEGへ無料変換。写真のアップロード不要。容量・画像サイズを確認し、公式の顔写真規格も確認できます。";
