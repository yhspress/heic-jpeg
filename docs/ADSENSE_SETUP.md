# AdSense / Search Console / Yahoo! 운영 설정

## 현재 운영값
- 도메인: https://heic-jpeg.com
- 저장소: https://github.com/yhspress/heic-jpeg
- 문의: gentlehawaii@gmail.com
- 배포: Cloudflare Workers Static Assets / heic-jpeg
- sitemap: https://heic-jpeg.com/sitemap.xml

## AdSense 등록
1. 운영자의 Google AdSense 계정에서 사이트 > 새 사이트에 heic-jpeg.com을 추가합니다.
2. 실제 화면에서 확인한 publisher ID는 src/config/adsense.json에 저장되어 있습니다. NEXT_PUBLIC_ADSENSE_CLIENT 환경변수로 재정의할 수 있습니다. prebuild와 Next.js에 동일한 환경변수를 전달하세요. 예시나 다른 계정의 ID를 사용하지 않습니다.
3. npm run build는 실제 ID로 ads.txt와 google-adsense-account 메타 태그를 생성합니다. npm run deploy 후 공개 HTML 및 /ads.txt를 확인합니다.
4. AdSense 소유 확인 방법 중 메타 태그 또는 ads.txt를 선택합니다. 본 사이트는 사용자 동의 전 광고 JS가 로드되지 않으므로 스크립트 기반 확인만 의존하지 않습니다.
5. 사이트 검토를 요청하고 상태(준비 중/검토 필요/준비됨)를 실제 화면에서 확인합니다. 배포 완료와 승인 완료는 다릅니다.
6. 승인 후 수동 광고 단위를 만들고 HOME, GUIDE, FAQ slot ID 환경변수를 설정합니다. Auto ads는 기본 비활성화를 권장합니다. 광고는 파일 선택·결과·다운로드 주변에 표시하지 않습니다.
7. 필요한 지역에 대해 Google 인증 CMP를 Privacy & messaging에서 구성합니다. 사이트의 간단한 동의 선택기는 Google 인증 CMP를 대체하지 않습니다.

## Google Search Console
1. https://search.google.com/search-console 에서 heic-jpeg.com 도메인 속성을 추가합니다.
2. Google이 발급한 DNS TXT를 Cloudflare에 추가하고 검증합니다. 대안은 URL-prefix https://heic-jpeg.com/ 속성 + NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION 메타 태그 설정 및 재배포입니다.
3. 사이트맵에 https://heic-jpeg.com/sitemap.xml 제출.
4. 홈 URL 검사에서 실제 URL 테스트 후 색인 생성 요청.
5. 제출/소유확인/색인 완료를 분리해 확인합니다. 순위나 색인은 보장되지 않습니다.

## Yahoo!
일본 사용자를 대상으로 하므로 Yahoo! JAPAN을 우선합니다. Yahoo! 공식 도움말은 검색 로봇의 자동 수집과 갱신을 설명하며, 별도 수동 사이트 등록 완료로 간주하지 않습니다.
- 공식: https://support.yahoo-net.jp/PccSearch/s/article/H000007965
- 갱신: https://support.yahoo-net.jp/SccSearch/s/article/H000010324
Google Search Console 제출과 접근 가능한 robots/sitemap을 갖춘 뒤 수집을 기다립니다. site:heic-jpeg.com 검색 결과가 없다고 등록 실패나 사이트 장애로 판단하지 않습니다.
글로벌 Yahoo 대상까지 필요한 경우 Bing Webmaster Tools 연결을 별도 수행할 수 있으며, 이 문서는 Bing 등록 완료를 의미하지 않습니다.

## 편집·검색 정책
출처, 날짜, 자연스러운 질문·답변, Article와 Breadcrumb 구조화 데이터를 실제 본문과 일치시킵니다. 존재하지 않는 리뷰/전문 자격/심사 보장/FAQ 리치결과 보장을 만들지 않습니다.
- https://support.google.com/adsense/answer/7299563
- https://developers.google.com/search/docs/appearance/ai-features

## 확인 전 금지
등록 화면에 접근하지 못했으면 등록 완료로 보고하지 않습니다. 인증값은 Git에 커밋하지 않으며 공개 verification/publisher ID와 비밀 API 토큰을 구분합니다.
