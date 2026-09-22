# HEIC 브라우저 테스트 자료

SHA-256: `7F8B363E4936C0666A25F64F3A92FDA10BD8E5453BE4592530B65A55DD98F3F2`

`example.heic`는 libheif 프로젝트의 공개 예제입니다. 출처: https://raw.githubusercontent.com/strukturag/libheif/master/examples/example.heic . examples/COPYING의 MIT 고지를 함께 보관합니다. 개인 얼굴 사진, 위치 정보가 포함된 사용자의 원본, 마이넘버카드 이미지는 테스트 자료로 커밋하지 않습니다.

브라우저 테스트는 이 파일을 실제로 선택하고 JPEG 다운로드, 픽셀 크기, 3성분 인코딩, EXIF/XMP APP1 제거 및 업로드 요청 부재를 확인합니다. 파일이 없으면 성공 처리를 하지 않고 실패합니다.

실행: `npm run build` 다음 `npx playwright test`. Chromium과 WebKit 엔진에서 실행하며 WebKit 결과를 실제 iPhone Safari 실기기 테스트로 표현하지 않습니다.
