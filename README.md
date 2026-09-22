# heic-jpeg.com

일본 iPhone 사용자가 마이넘버카드 온라인 신청용 HEIC/HEIF 사진을 JPEG로 준비하는 독립 서비스. 사진 업로드 API, 계정, DB가 없습니다.

## 로컬 실행
Node.js 24 이상. `npm ci`, `npm run dev`.
검증: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npx playwright install chromium webkit`, `npm run test:e2e`.
정적 미리보기: `npm run preview`.

## 설정
- `src/config/site.ts`: 기본 도메인 https://heic-jpeg.com, 연락처 gentlehawaii@gmail.com, 브랜드.
- `src/config/mynumberRequirements.ts`: 공식 출처·확인일·파일 조건.
- `.env.example`: 선택적 AdSense/GA/소유확인 값. 설정은 빌드 시 반영됩니다.
- 공식 KB/MB는 바이트 환산을 명시하지 않으므로 UI 판정은 1024 기준 참고치입니다. 경계값은 공식 업로드 결과를 우선합니다.
- `NEXT_PUBLIC_ADSENSE_CLIENT`는 실제 ca-pub-숫자16자리만 허용합니다. 미설정이면 광고 통신 없음. prebuild는 같은 값으로 ads.txt를 생성합니다. 실 ID가 없으면 승인/판매자 등록 완료를 주장하지 않습니다.

## 이미지 처리
실제 시그니처 검사 → 브라우저 기본 디코더 시도 → 필요할 때 heic-to 1.5.2 지연 로드 → sRGB canvas → JPEG 품질 파라미터 0.92. 원 해상도를 기본 보존하고 EXIF 등 원 메타데이터를 복사하지 않습니다. JPEG의 3성분과 픽셀 수를 검사합니다. 저장 인코딩은 일반적으로 YCbCr이며 RGB 워크플로와 CMYK를 구분합니다.

입력 최대 30MiB, 디코딩 후 최대 50MP. 압축 파일의 전개 메모리는 제한 검사 전에 소비될 수 있어 저메모리 기기에서 브라우저가 중단될 수 있습니다. 모든 HEIF 코덱/멀티이미지를 보장하지 않으며 1개 이미지만 출력합니다. native/libheif 방향 처리를 사용하고 사용자에게 미리보기 확인을 안내합니다. 얼굴/배경 심사와 자동 크기 변경은 하지 않습니다.

## 배포
GitHub: https://github.com/yhspress/heic-jpeg
Cloudflare Workers Static Assets: `heic-jpeg`. 정적 산출물 `out/`.
Cloudflare 로그인된 운영 환경에서 `npm run build` 후 `npm run deploy`.
`wrangler.jsonc`에 apex/www 도메인이 선언되어 있습니다. www는 apex로 리디렉션합니다. 외부 토큰을 소스에 저장하지 않습니다.
GitHub Actions는 lint/typecheck/unit/build/Chromium/WebKit를 실행하고 정적 산출물을 보관합니다. 자동 배포용 자격증명은 임의로 발급하거나 기존 OAuth 토큰을 GitHub에 복사하지 않습니다.

## 검색·수익화
15개 일본어 페이지, sitemap, robots, canonical, OG 이미지, WebSite/WebApplication/Article/Breadcrumb JSON-LD. 사이트 방문자에게 보이는 내용과 일치하는 구조화 데이터만 사용합니다. AI 검색용 별도 순위/승인 보장 없음.
등록 절차 및 실제 상태는 docs/ADSENSE_SETUP.md, docs/RELEASE_STATUS.md 참고.
광고는 도구 아래 정보 영역·가이드 중간·FAQ 앞에만 있습니다. Auto ads는 운영 시 비활성화하거나 변환 화면/버튼 주변을 제외해야 합니다.
광고/GA는 사용자가 허용한 후에만 로드됩니다. 이 간단한 동의 UI는 Google 인증 CMP가 아닙니다. 해당 지역의 광고 요청에 인증 CMP가 요구되는 경우 Google Privacy & messaging에서 구성한 다음 광고를 활성화해야 합니다.

## 라이선스
앱 소스와 디코더 고지는 THIRD_PARTY.md 참고. 디코더를 별도 청크로 배포하고 라이선스 전문 및 대응 원본 소스 패키지 링크를 제공합니다. 디코더를 교체하고 재빌드할 수 있습니다.
