import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ADSENSE_PUBLISHER_ID, CONTACT_EMAIL, GA_ID, UPDATED_DATE } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { mynumberRequirements as req } from "@/config/mynumberRequirements";

const pages: Record<string, { title: string; body: React.ReactNode }> = {
  about: { title: "このサイトについて", body: <> <p>このサイトは、iPhoneで撮影したHEIC写真を、マイナンバーカードのオンライン申請で確認しやすいJPEGへ変換するための独立したツールです。公的機関やマイナンバーカードの公式サービスではありません。</p><p>アカウント登録、ログイン、写真のサーバー保存は行いません。</p></> },
  privacy: { title: "プライバシーポリシー", body: <><p>当サイトは、写真をブラウザ内で処理し、当サイトのサーバーへアップロード・保存しません。変換後のJPEGは元の不要なメタデータを引き継がない設計です。</p><p>AdSenseを有効化した場合、Google等の広告配信事業者がCookieその他の技術を用いて広告を表示することがあります。アクセス解析を有効化した場合は、Google Analytics等で利用状況を把握することがあります。これらは設定・法令に応じて運用します。</p><p>お問い合わせは <a className="text-blue-700 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までお願いします。</p></> },
  terms: { title: "利用規約", body: <><p>本サービスは現状有姿で提供します。利用者は自己の責任で写真を変換・ダウンロード・申請に使用するものとします。</p><p>本サービスは申請の受付、写真の内容審査、申請結果を保証しません。公式案内を確認してご利用ください。</p></> },
  contact: { title: "お問い合わせ", body: <p>不具合やご意見は <a className="text-blue-700 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> までお寄せください。写真ファイルや個人番号をメールで送らないでください。</p> },
  disclaimer: { title: "免責事項", body: <><p>当サイトはマイナンバーカードの公式サービスではなく、いかなる行政機関・J-LISとも提携または承認関係にありません。</p><p>掲載情報は確認日時点の公式情報に基づきますが、完全性・最新性・申請受理を保証しません。最終的な条件は公式サイトで確認してください。</p></> },
  "file-privacy": { title: "写真ファイルの取り扱い", body: <><p>選択した写真はブラウザ内で変換されます。変換のために画像ファイルを当サイトのサーバーへ送信・保存しません。</p><p>JPEGは新しく書き出され、撮影日時・位置情報など元ファイルのEXIFメタデータをコピーしません。</p></> },
  sources: { title: "情報源", body: <><p>申請用写真の形式・容量・ピクセル数は、<a className="text-blue-700 underline" href={req.officialSourceUrl} target="_blank" rel="noreferrer">マイナンバーカード総合サイト「オンライン申請の写真データの大きさに制限はありますか？」</a>を参照しています。</p><p>最終確認日：{req.lastVerifiedDate}。条件は変更される可能性があるため、申請直前に公式情報を確認してください。</p></> },
};
const mail = <a className="text-blue-700 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
const external = (url: string, label: string) => <a className="text-blue-700 underline" href={url} target="_blank" rel="noopener noreferrer">{label}</a>;
type Section = { heading: string; body: React.ReactNode };
const sections: Record<string, Section[]> = {
  about: [
    { heading: "運営目的", body: <p>iPhoneで撮った顔写真がHEICだったため申請に使えない。その問題を少ない手順で解決するためのサイトです。一般的な画像編集機能を増やすことより、写真形式の変換と申請前の確認に役立つ案内を重視しています。</p> },
    { heading: "運営者", body: <p>heic-jpeg.com 運営者が管理する独立サービスです。行政機関や地方公共団体情報システム機構（J-LIS）との提携・承認関係はありません。連絡先：{mail}</p> },
    { heading: "情報の確認・訂正方針", body: <><p>申請条件は公式情報を優先し、出典と確認日を掲載します。端末の操作案内は機種やOSによって異なる場合があることを明示します。未確認の内容を最新情報として扱うことはしません。</p><p>誤りや古い記述については、該当URLと参考になる公式情報をメールでお知らせください。内容を確認して必要な訂正を行います。参照先は<Link href="/sources" className="text-blue-700 underline">情報源</Link>をご覧ください。</p></> },
    { heading: "広告と編集の独立性", body: <p>継続運営のため広告を掲載する場合があります。広告は区別して表示し、変換やダウンロードの操作と混同しにくい場所に配置します。広告の有無によって公式条件を変更したり、広告の商品を利用しないと変換できないようにしたりすることはありません。</p> },
  ],
  privacy: [
    { heading: "閲覧時の通信と配信サービス", body: <><p>写真をアップロードしなくても、ページやプログラムの取得には通信が発生します。ホスティング・配信事業者はIPアドレス、アクセス日時、要求URL、ブラウザ情報などを配信、セキュリティ対策、障害調査のために取り扱う場合があります。</p><p>配信に関する情報は{external("https://www.cloudflare.com/privacypolicy/", "Cloudflareのプライバシーポリシー")}もご確認ください。</p></> },
    { heading: "お問い合わせの情報", body: <p>メールアドレス、本文に記載されたお名前や問い合わせ内容を、返信・調査・対応履歴の確認に使用します。対応に必要な期間保管し、不要になった情報は適切に削除します。法令に基づく場合を除き、広告目的で第三者へ提供しません。顔写真、個人番号、申請書IDは送らないでください。</p> },
    { heading: "Google AdSenseとCookie", body: <><p>広告を有効にした場合、Googleなどの第三者配信事業者がCookie等を使い、本サイトや他サイトへのアクセス情報に基づく広告を配信する場合があります。現在の配信設定：{ADSENSE_PUBLISHER_ID ? "AdSense設定あり（表示は審査・配信状況によります）。" : "AdSense設定なし。設定がない場合はスクリプトを読み込みません。"}</p><p>{external("https://policies.google.com/technologies/partner-sites?hl=ja", "Googleのパートナーサイトでの情報利用")}と{external("https://policies.google.com/privacy?hl=ja", "Googleプライバシーポリシー")}をご確認ください。パーソナライズ広告は{external("https://myadcenter.google.com/", "マイ アド センター")}で管理できます。Cookieはブラウザの設定でも管理できます。</p></> },
    { heading: "アクセス解析", body: <><p>Google Analyticsは測定IDを設定した場合に限り有効になります。現在の設定：{GA_ID ? "設定あり。" : "設定なし。"} 有効時はCookie等を使って閲覧状況や端末・ブラウザに関する情報を収集する場合があります。変換対象の画像を解析のために送信する機能は設けません。</p><p>収集の制御には{external("https://tools.google.com/dlpage/gaoptout?hl=ja", "Google Analyticsオプトアウト アドオン")}も利用できます。</p></> },
    { heading: "広告・解析への同意", body: <p>広告または解析の設定がある場合は、許可の選択後に対象のスクリプトを読み込みます。拒否しても写真の変換は利用できます。選択はブラウザのローカルストレージに保存します。ページ下部から許可を取り消すと、それ以降の読み込みを停止します。以前に第三者が保存したCookieはブラウザの設定から削除できます。</p> },
    { heading: "方針の見直しと連絡先", body: <p>サービスや法令等の変更に応じて本方針を見直し、本ページに掲載します。情報の取り扱いや削除のご相談は、heic-jpeg.com 運営者（{mail}）へご連絡ください。</p> },
  ],
  terms: [
    { heading: "提供内容", body: <p>HEIC・HEIF写真をJPEGへ変換し、申請前の確認に役立つ情報を提供します。会員登録・利用料は不要です。通信費は利用者の負担となります。端末や画像の保存方式によって変換できない場合があります。</p> },
    { heading: "利用者による確認", body: <p>利用する権利のある写真を選択し、元ファイルは必要に応じて保管してください。保存したJPEGの向き、色、鮮明さ、容量、ピクセル数をご自身で確認してください。本サイトは顔写真の自動審査を行いません。</p> },
    { heading: "禁止事項", body: <p>違法な目的、第三者の権利やプライバシーを侵害する利用、過度な負荷をかける行為、運営や他の利用者の利用を妨げる行為を禁止します。本サイトを行政機関の公式サービスと誤認させる利用も禁止します。</p> },
    { heading: "変更・中断と責任の範囲", body: <p>保守、障害、技術上の事情により機能の変更や提供の中断・終了を行う場合があります。責任は適用法令に従います。本規約は運営者の故意または重大な過失による責任など、法令上制限できない責任を免除するものではありません。</p> },
    { heading: "規約の見直し・連絡先", body: <p>改定後の規約と更新日は本ページに掲載します。運営：heic-jpeg.com 運営者。お問い合わせ：{mail}</p> },
  ],
  contact: [
    { heading: "お問い合わせ先", body: <p>運営：heic-jpeg.com 運営者。メール：{mail}。内容を確認して対応します。調査に時間がかかる場合があり、個別の回答や回答期限をお約束するものではありません。</p> },
    { heading: "不具合の確認に役立つ情報", body: <p>端末名、OS・ブラウザ名、操作の手順、表示されたエラーメッセージをお知らせください。分かる場合は容量やピクセル数も参考になります。写真そのものの添付は不要です。</p> },
    { heading: "送信しないでいただきたい情報", body: <p>顔写真、個人番号、申請書ID、本人確認書類を送らないでください。画面の画像を添付する場合も、顔写真や氏名などが含まれていないか確認してください。問い合わせ情報の扱いは<Link href="/privacy" className="text-blue-700 underline">プライバシーポリシー</Link>をご覧ください。</p> },
    { heading: "申請状況・写真の採否について", body: <p>本サイトでは申請状況、審査結果、受け取り時期を確認できません。{external("https://www.kojinbango-card.go.jp/", "公式サイト")}が案内する窓口へお問い合わせください。記事の訂正依頼は、該当URLと参考になる公式情報をお知らせください。</p> },
  ],
  disclaimer: [
    { heading: "JPEG変換と写真の適否は別です", body: <p>JPEGになり、容量やピクセル数が範囲内でも、背景、影、顔の大きさ、撮影時期などによって写真が不適切な場合があります。本サイトの確認結果は自動審査や申請受理の保証ではありません。</p> },
    { heading: "情報の確認時点", body: <p>公式情報を参考にしていますが、条件や案内は変更される場合があります。ファイル条件の確認日：{req.lastVerifiedDate}。申請直前は<Link href="/sources" className="text-blue-700 underline">参照先の公式案内</Link>をご確認ください。</p> },
    { heading: "外部リンクと広告", body: <p>外部サイトの情報や広告は各提供者が管理します。掲載によってその内容を保証・推薦するものではありません。責任の範囲は適用法令に従い、法令上免除できない責任まで免除するものではありません。</p> },
    { heading: "連絡先", body: <p>heic-jpeg.com 運営者：{mail}</p> },
  ],
  "file-privacy": [
    { heading: "写真処理とサイトの通信", body: <p>変換対象の写真をアップロードする仕組みはありません。一方、ページやプログラムを取得する通信は発生します。広告や解析を設定した場合の情報の取り扱いは<Link href="/privacy" className="text-blue-700 underline">プライバシーポリシー</Link>をご覧ください。</p> },
    { heading: "元の写真とJPEG", body: <p>元のHEICを上書き・削除せず、新しいJPEGを書き出します。原則として元のピクセル数を保ちますが、圧縮形式が異なるため容量や見え方が変わる場合があります。ダウンロード後に向きと画質を確認してください。</p> },
    { heading: "メタデータと写り込んだ情報", body: <p>元写真のEXIFなどの付加情報をコピーしませんが、書き出し側が生成する基本的な画像情報が付く場合があります。顔、名札、書類、背景など画像内の情報は残ります。メタデータの非継承は写真の匿名化ではありません。</p> },
    { heading: "保存したファイルの管理", body: <p>ページを閉じても、ダウンロードしたJPEGや元のHEICは端末に残ります。共有端末では保存先を確認してください。保存フォルダがクラウドと同期される設定なら、端末側の設定に従って同期される場合があります。本サイトは同期やバックアップを制御できません。</p> },
    { heading: "お問い合わせ", body: <p>写真や個人番号を添付せず、端末・ブラウザ・エラー文を {mail} へお知らせください。</p> },
  ],
  sources: [
    { heading: "公式のファイル条件", body: <p>参照する条件はJPEG形式、RGBカラーモード、20KB～7MB、幅・高さとも480～6000ピクセルです。これらは写真の内容を審査する条件のすべてではありません。背景や顔の大きさなども公式案内で確認してください。</p> },
    { heading: "申請方法の公式案内", body: <p>{external("https://www.kojinbango-card.go.jp/apprec/apply/", "マイナンバーカード総合サイト：申請方法")}。申請経路、手順、顔写真の注意点は公式の案内に従ってください。</p> },
    { heading: "iPhoneの写真形式", body: <p>{external("https://support.apple.com/ja-jp/116944", "Appleサポート：Apple製のデバイスでHEIF／HEVCメディアを扱う")}。保存形式や共有時の互換性を確認する参考情報です。設定や挙動は機種・OS・共有先により異なる場合があります。</p> },
    { heading: "使用ソフトウェアとライセンス", body: <><p>HEIC・HEIFの読み込みにはheic-to 1.5.2を利用します。ライセンスはLGPL-3.0です。</p><p>{external("https://github.com/hoppergee/heic-to", "ソースコード・ライセンス")} ／ {external("https://www.npmjs.com/package/heic-to/v/1.5.2", "バージョン1.5.2の配布情報")} ／ {external("https://www.gnu.org/licenses/lgpl-3.0.html", "GNU LGPL version 3全文")}</p><p>ライブラリの利用はすべてのファイルへの対応や、申請写真の受理を保証するものではありません。</p></> },
    { heading: "更新と訂正", body: <p>公式案内の変更や誤りを確認した場合、条件設定と説明を見直します。訂正のご連絡は該当URLと情報源を添えて、heic-jpeg.com 運営者（{mail}）へお願いします。</p> },
  ],
};
const descriptions: Record<string, string> = {
  about: "運営目的、公式サービスとの関係、編集・訂正方針、広告の独立性をご案内します。",
  privacy: "写真のローカル処理、配信ログ、問い合わせ、広告Cookie、アクセス解析と連絡先を説明します。",
  terms: "HEICからJPEGへの変換サービスの利用条件、確認事項、禁止事項、責任の範囲をご案内します。",
  contact: "不具合、掲載情報の訂正、ご意見はこちら。問い合わせ時に役立つ情報と送信しないでいただきたい個人情報をご案内します。",
  disclaimer: "公式サービスとの関係、JPEG変換と申請写真の適否の違い、掲載情報・外部リンクの注意点を説明します。",
  "file-privacy": "写真の処理場所、メタデータ、元ファイル、ダウンロードしたJPEGの管理方法をご案内します。",
  sources: "申請写真の公式条件、AppleのHEIF案内、変換ライブラリとライセンス、確認日を掲載します。",
};
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.prototype.hasOwnProperty.call(pages, slug)) notFound();
  return pageMetadata(pages[slug].title, descriptions[slug], `/${slug}`);
}
export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.prototype.hasOwnProperty.call(pages, slug)) notFound();
  const page = pages[slug];
  return <article className="mx-auto max-w-3xl px-5 py-16">
    <Link href="/" className="text-sm text-blue-700 underline">写真変換ツールへ戻る</Link>
    <h1 className="mt-6 text-3xl font-bold">{page.title}</h1>
    <p className="mt-3 text-sm text-slate-500">更新日：<time dateTime={UPDATED_DATE}>{UPDATED_DATE}</time></p>
    <div className="mt-8 space-y-5 leading-8 text-slate-700">{page.body}</div>
    <div className="mt-10 space-y-10">{sections[slug].map((section) => <section key={section.heading}>
      <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
      <div className="mt-4 space-y-4 break-words leading-8 text-slate-700">{section.body}</div>
    </section>)}</div>
  </article>;
}
