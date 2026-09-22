# 배포 상태 — 2026-09-22

## 확인된 구현
- heic-jpeg.com / gentlehawaii@gmail.com 적용.
- 일본어 15페이지: 도구 1, 안내·정책 7, 가이드 목록 1, 가이드 6.
- canonical, sitemap, robots, OG, WebSite/WebApplication/Article/Breadcrumb 구조화 데이터.
- 브라우저 내 HEIC/HEIF→JPEG, 메타데이터 미복사, 입력·출력 검증, 결과 미리보기.
- Google 광고·Google Analytics 기본 비활성. 실제 publisher ID 미확인. Cloudflare 호스팅이 자동 삽입하는 성능 측정은 별도로 개인정보 페이지에 명시.

## 검증
- lint/typecheck/build 성공.
- 단위 테스트 8개 성공.
- Playwright Chromium/WebKit 10개 성공: HEIC 변환/다운로드, JPEG 3성분, EXIF APP1 없음, 이미지 POST 없음, 위장·손상 파일, 30MiB 초과, 재시도, 390px 15페이지, SEO/JSON-LD, 404.
- 실제 iPhone Safari 기기 테스트는 수행하지 않음. WebKit 자동 테스트가 이를 완전히 대체하지 않음.
- npm audit 취약점 0건 확인.

## 외부 진행
- GitHub https://github.com/yhspress/heic-jpeg 소스 공개. GitHub Actions 35707350321에서 Linux clean install/lint/typecheck/unit/build/Chromium/WebKit 성공.
- Cloudflare 정적 사이트 heic-jpeg 및 www 리디렉션 heic-jpeg-www 배포. 15개 페이지와 robots/sitemap/OG/ads.txt HTTPS 200, 미존재 URL 404, www→apex 301 확인.
- 공개 https://heic-jpeg.com 에서 실제 HEIC 변환·JPEG 다운로드 성공. Cloudflare /cdn-cgi/rum 성능 측정 JSON 통신만 허용하여 이미지 바이트·파일명 전송 부재 확인.
- AdSense/Search Console 등록 미실행: Windows Computer Use가 현재 브라우저 URL을 확정하지 못하여 이 턴에서 중단됨. 사용자 로그인 실패로 확인된 것은 아님.
- Yahoo! JAPAN 자동 수집을 위한 공개 sitemap/robots 준비. 검색 결과 등재 완료를 보장하지 않음.

## 다음에 이어서 할 작업
1. 브라우저 제어가 정상인 새 턴에서 AdSense 사이트 추가·실제 publisher ID 확인·재빌드/배포·검토 요청.
2. Google Search Console 소유권 확인과 sitemap 제출. 현재 Cloudflare OAuth는 DNS 읽기/쓰기 권한이 없으므로 URL-prefix 메타 태그 방법 또는 브라우저 DNS 관리 필요.
3. Yahoo! JAPAN은 공식 수집 안내에 따라 Google 색인과 실제 노출을 구분해 확인. 별도 등록했다는 주장 금지.
4. 재시작 시 기존 테스트 전체를 반복하지 말고 변경된 인증 태그/ads.txt/서비스 등록 상태만 검증.

## 복구 기록
- Windows Node 24.11.1 Wrangler subprocess native exit: Node 22.23.2로 배포 성공.
- Cloudflare Workers _redirects는 절대 source URL을 허용하지 않아 www 전용 redirect Worker로 수정.
- Windows node_modules 기반 lockfile의 플랫폼 의존성 누락: 빈 임시 디렉터리에서 lock 재생성 후 Linux CI 성공.
