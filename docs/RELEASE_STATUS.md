# 배포 상태 — 2026-09-22

## 확인된 구현
- heic-jpeg.com / gentlehawaii@gmail.com 적용.
- 일본어 15페이지: 도구 1, 안내·정책 7, 가이드 목록 1, 가이드 6.
- canonical, sitemap, robots, OG, WebSite/WebApplication/Article/Breadcrumb 구조화 데이터.
- 브라우저 내 HEIC/HEIF→JPEG, 메타데이터 미복사, 입력·출력 검증, 결과 미리보기.
- 기본 광고·분석 스크립트 없음. 실제 publisher ID 미확인.

## 검증
- lint/typecheck/build 성공.
- 단위 테스트 8개 성공.
- Playwright Chromium/WebKit 10개 성공: HEIC 변환/다운로드, JPEG 3성분, EXIF APP1 없음, 이미지 POST 없음, 위장·손상 파일, 30MiB 초과, 재시도, 390px 15페이지, SEO/JSON-LD, 404.
- 실제 iPhone Safari 기기 테스트는 수행하지 않음. WebKit 자동 테스트가 이를 완전히 대체하지 않음.
- npm audit 취약점 0건 확인.

## 외부 진행
- GitHub yhspress/heic-jpeg 저장소 생성.
- Cloudflare 계정 및 도메인 active 확인. 배포 결과는 후속 업데이트.
- AdSense/Search Console 등록 미실행: Windows Computer Use가 현재 브라우저 URL을 확정하지 못하여 이 턴에서 중단됨. 사용자 로그인 실패로 확인된 것은 아님.
- Yahoo! JAPAN 자동 수집을 위한 공개 sitemap/robots 준비. 검색 결과 등재 완료를 보장하지 않음.
