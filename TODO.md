# Clara's Hub — 프로젝트 진행 체크리스트

> 단일 `index.html` PWA 플래너 · GitHub Pages 배포 (`jihyeoh-es.github.io/clara-hub`)
> 월/주 캘린더 + 할 일 + 카테고리(태그) · 구글 캘린더 읽기전용 연동 · Supabase 클라우드 동기화
> 디자인 토큰: 배경 `#F5F4ED`, 포인트 보라 `#7F77DD`/`#5D54C2`, Tabler 아이콘, 한국어 UI
> 최종 업데이트: 2026-06-18

---

## ✅ 완료

### 🏗️ 1. 기획 & 기초 (앱의 시작)
- [x] "이런 앱 만들 수 있을까?" 구상 → 단일 HTML PWA로 결정
- [x] VS Code + Live Server + GitHub Pages 워크플로우 셋업
- [x] 디자인 토큰 정의 (베이지 배경, 보라 포인트, 그림자 단계, Tabler 아이콘)
- [x] 앱 아이콘 / manifest / apple-touch-icon (PWA 설치 가능하게)
- [x] 4탭 기본 구조 (월 / 주 / 할 일 / 태그)
- [x] localStorage 저장 레이어

### 🎨 2. UI / UX 구축 & 디자인 다듬기
- [x] 월 뷰 — 달력 그리드, 날짜 셀에 일정·할 일 표시, 상세 영역
- [x] 주 뷰 — 칸반/리스트 토글, 날짜별 카드
- [x] 통합 기간 네비게이터 (좌우 화살표 + 가운데 라벨, "오늘" 버튼)
- [x] day-header를 옅은 보라 알약(pill) 스타일로
- [x] 할 일 — 입력줄, 필터(전체/진행/완료/지남), 완료 삭제, 편집 모달
- [x] 할 일 입력줄 높이/레이아웃 정리 (nowrap, 카테고리 피커 폭)
- [x] 카테고리(태그) 탭 — Notion 스타일(호버 시 편집/삭제), 색 점 + 이름
- [x] 카테고리 색 선택 팝업 (파스텔 4색 + 직접 선택)
- [x] 카테고리 편집 모달 (이름 + 색)
- [x] 이름 중복/빈 이름 검증 (빨간 테두리 + 인라인 에러) — 모달 전반 통일
- [x] 커스텀 시간 선택기 (TimePicker)
- [x] 일정 추가/편집 모달
- [x] 할 일 상세 모달 / 구글 일정 상세 모달 (읽기전용, 숨기기 버튼)
- [x] 색 밝기 따라 텍스트 색 자동 조정 (가독성)
- [x] 모바일 대응 (탭바 줄바꿈, iOS 날짜 피커, 폰트 크기)
- [x] 카테고리 이름 길 때 할 일 제목 안 보이던 버그 (태그 max-width 40%+말줄임, 제목 우선) — 2026-06-18

### 🐛 3. 초기 버그 잡기 (HTML 구조 등)
- [x] `#month-day-detail` self-closing div → 자식이 display:none 탈출하던 문제
- [x] `.app-container` 조기 닫힘 → 일부 뷰가 패딩 밖으로 나가던 문제
- [x] `#view-month` 닫는 div 누락 → 다른 뷰가 안에서 렌더되던 문제
- [x] 중복 `#detail-title` 정리
- [x] 할 일 편집 모달 Enter 핸들러 null 에러
- [x] "없음"/"미분류" 용어 통일

### 📅 4. 구글 캘린더 연동 (읽기전용)
- [x] Google Cloud Console 셋업 (프로젝트, Calendar API, OAuth 동의화면, 클라이언트 ID)
- [x] GIS 토큰 방식 채택 (서버 없는 정적 사이트라 redirect 대신 토큰)
- [x] 다중 계정 연결 (개인 ggmade + 회사 devsisters)
- [x] calendarList로 캘린더 목록 받아 체크박스로 선별
- [x] 일정 가져오기 (timeMin~timeMax 범위, gEvents)
- [x] 카테고리 색 매핑 (계정별 팔레트, 보라 제외)
- [x] 일정 숨기기/복구 기능
- [x] 동기화 탭 UI (계정별 카드, 캘린더 펼침)
- [x] 캘린더 "전체 선택/해제" 토글 버튼 — 2026-06-18

### 🍎 5. iCloud → 구글 캘린더 정리 (데이터 이관)
- [x] iCloud 캘린더를 구글로 이전 (부부→BB, me→개인, 출금→출금)
- [x] Mac 캘린더 .ics export → 구글 import 방식
- [x] iPhone Exchange 계정 중복 정리
- [x] 한계 확인: iCloud 공유 캘린더는 구글과 자동 동기화 불가 → 구글 다리 경유가 현실적 경로

### 📄 6. 초대 가이드 (상용화 대비 첫 발)
- [x] 지인용 범용 초대 가이드 `guide.html` (앱 디자인 결 맞춤, 제품 매뉴얼 톤)
- [x] FAQ, 읽기전용 안내, 색/태그 유지 설명, favicon
- [x] 남편 구글 계정을 OAuth 테스트 사용자로 추가

### ☁️ 7. Supabase 클라우드 동기화 (대형 작업, 6단계)
- [x] 1단계 — Supabase 프로젝트 생성 (Seoul 리전)
- [x] 2단계 — 테이블 3개(todos/categories/events) + RLS + updated_at 트리거
- [x] 3단계 — 구글 로그인 (Google OAuth → Supabase Auth)
- [x] 4단계 — 앱에 로그인 연결 (CustomEvent `auth-changed`로 user_id 전달)
- [x] 5단계 — 저장 로직
  - [x] push(쓰기): save() 시 배열 통째 upsert
  - [x] 마이그레이션: 로컬 → 클라우드 1회 업로드 (user_id별 잠금)
  - [x] 소프트 삭제(is_deleted) + 카테고리 삭제 시 할일 미분류 이동
  - [x] updatedAt 심기 (LWW 비교용)
  - [x] pull(읽기): 클라우드 → 로컬 병합 (클라우드만/로컬만/충돌/삭제됨)
  - [x] LWW(최신 우선) 충돌 해결
  - [x] 구글 카테고리 gcal_key 기준 매칭 (push·pull 양쪽)
- [x] 6단계 — 테스트 (폰↔맥북 양방향 + 충돌 수렴 검증)

### 🔧 8. 서비스워커 / PWA 캐시 근본 수정
- [x] 원인 발견 — 기존 SW(v9)가 전부 cache-first라 폰이 옛 코드에 갇힘
- [x] SW 교체 — HTML은 network-first(항상 최신), 그 외 cache-first
- [x] SW 해제 코드 → 등록 + 자동 업데이트로 교체
- [x] Supabase/Google 요청은 SW가 안 건드리게
- [x] 앞으로 배포 시 CACHE_VERSION 숫자만 올리면 폰 자동 갱신

### 🔁 9. 카테고리 부활 버그 (대형 디버깅, 2일)
- [x] 월/주 뷰 일정 추가 버튼 ("+" 버튼, day-header 색 통일)
- [x] 근본 원인 3개 규명 (loadAll DEFAULT_CATS 새 UUID / 🌱시드 / 로컬 잔해 재push)
- [x] 클라우드 직접 카테고리(gcal_key null) 전부 DELETE(영구삭제)
- [x] loadAll을 빈 배열로 시작하게 수정
- [x] 🌱 시드 코드 제거
- [x] 폰 PWA 삭제로 옛 서비스워커 제거 (사파리 데이터 지우기로는 SW 안 죽음 ← 교훈)
- [x] 최종 검증: 삭제하면 양쪽서 사라지고 새로고침해도 부활 안 함(stick)
- [x] 구글 일정 가져와도 카테고리 안 늘어남 확인 (맥북·폰)

### 🎛️ 10. 동기화 탭 UX 개선 (2026-06-18)
- [x] "클라우드 동기화" / "구글 캘린더" 두 카드로 시각 분리
- [x] 버튼 라벨 직관화 ("계정 추가" / "일정 새로고침") + 크기 통일
- [x] 마이그레이션을 모달 흐름으로 — 로그인 시에만 묻고 새로고침 땐 안 뜸
  - [x] sessionStorage `justSignedIn` 플래그로 "진짜 로그인" vs "세션 복원" 구분
  - [x] 로그인 후 동기화 탭 자동 전환 (모달이 그 위에 뜨게)
  - [x] "나중에" 누르면 카드에 "기존 데이터 올리기" 버튼으로 남김 (B안)
- [x] 마이그레이션 안내/완료 문구 다듬기

### 🧹 11. 가벼운 정리 (2026-06-18)
- [x] 노란 경고 해소 — `<meta name="mobile-web-app-capable" content="yes">` 추가
- [x] `onAuthStateChange` 중복 발화 정리 — `lastPulledUserId` 가드로 pull 1회만 (로그아웃 시 해제)
- [x] 콘솔 로그 정리 — `DEBUG` 플래그 + `dlog()` 헬퍼로 동기화 로그 감쌈 (DEBUG=true면 복원), 로그인 로그는 제거. error/warn은 유지

---

## ⬜ 할 일

### 멀티유저 대비 (구조)
- [ ] 기본 카테고리 시드 재설계 — 신규 유저엔 기본 카테고리 주되 **부활 안 하는 방식**으로 (가입 1회만, 플래그 잠금)
- [ ] 신규 가입 / 온보딩 플로우

### 기능 추가
- [ ] .ics 내보내기 (events → .ics, 비상백업 + 아이폰 캘린더 연동)
- [ ] 애플펜슬 자유필기 (아이패드, pointerType='pen', 좌표 JSON을 Supabase 저장)
  - [ ] 방법 A — 화면 앵커 (쉬움, 먼저)
  - [ ] 방법 B — 날짜셀 앵커 (좌표 정규화, 나중)

### 더 먼 미래
- [ ] 본격 멀티유저 런칭 (OAuth 테스트모드 → production 전환, 구글 검증 심사)
- [ ] 실시간 동기화(B 방식) — 필요해지면 (지금은 앱 열 때 pull 방식 A)

---

## 📌 기억해둘 교훈 / 주의사항
- 폰 PWA는 **앱 자체를 삭제**해야 옛 서비스워커가 죽음 (사파리 데이터 지우기로는 안 됨)
- 직접 카테고리(gcal_key null)는 id 매칭, 구글 카테고리는 gcal_key 매칭
- 데이터 직접 수정은 항상 **상태 확인 SQL 먼저** → 그다음 변경 (두더지 잡기 방지)
- 코드 수정은 Ctrl+F before/after 스니펫 방식, 전체 덤프 X
- 구글 OAuth 두 흐름 분리: GIS 토큰(캘린더 읽기) vs Supabase Auth(로그인/RLS) — 섞지 말 것
- Supabase 세션은 새로고침에도 SIGNED_IN으로 올 수 있음 → "진짜 로그인"은 sessionStorage 플래그로 구분
- iCloud 공유 캘린더는 구글과 자동 동기화 불가 → 구글 다리 경유
- 양쪽 기기 모두 오프라인이면 데이터 못 건너감 (클라우드 거쳐야 함) — 구조적 한계
- Clara user_id: `265f1a9c-99f4-47cb-8dbe-50beb854ac1d`
- SW 버전: 다음 배포 시 CACHE_VERSION 숫자 올리기
