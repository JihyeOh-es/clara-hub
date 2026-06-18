# Clara's Hub — 작업 진행 체크리스트

> 단일 `index.html` PWA 플래너 · GitHub Pages 배포 (`jihyeoh-es.github.io/clara-hub`)
> Supabase(Auth + DB + RLS) 클라우드 동기화 · 구글 캘린더 읽기전용 연동
> 최종 업데이트: 2026-06-18

---

## ✅ 완료

### 클라우드 동기화 (Supabase) — 6단계 로드맵
- [x] 1단계 — Supabase 프로젝트 생성 (Seoul 리전)
- [x] 2단계 — 테이블 3개(todos / categories / events) + RLS 정책 + updated_at 트리거
- [x] 3단계 — 구글 로그인 (Google OAuth → Supabase Auth)
- [x] 4단계 — 앱에 로그인 연결 (CustomEvent `auth-changed`로 메인 앱에 user_id 전달)
- [x] 5단계 — 저장 로직
  - [x] push(쓰기): save() 시 배열 통째 upsert
  - [x] 마이그레이션: 로컬 → 클라우드 1회 업로드 (user_id별 잠금)
  - [x] 소프트 삭제(is_deleted) + 카테고리 삭제 시 할일 미분류 이동
  - [x] updatedAt 심기 (LWW 비교용 재료)
  - [x] pull(읽기): 클라우드 → 로컬 병합 (4가지 상황: 클라우드만/로컬만/충돌/삭제됨)
  - [x] LWW(최신 우선) 충돌 해결
  - [x] 구글 카테고리 gcal_key 기준 매칭 (push·pull 양쪽)
- [x] 6단계 — 테스트 (폰↔맥북 양방향 동기화 + 충돌 수렴 검증)

### 구글 캘린더 연동
- [x] 다중 계정 연결 (개인 + 회사)
- [x] 캘린더별 선택 + 카테고리 색 매핑
- [x] 일정 가져오기 (읽기전용, gEvents)
- [x] 구글 일정 가져와도 카테고리 중복 안 생김 확인 (맥북·폰 양쪽)

### UI / UX
- [x] 월 뷰 일정 추가 — 더블클릭 대신 상세영역 "+ 일정 추가" 버튼
- [x] 주 뷰에도 동일 "+ 일정 추가" 버튼
- [x] 버튼 색 day-header와 통일 (옅은 보라 #EFEDFA / #5D54C2)
- [x] 동기화 카드 레이아웃 세로 전환

### 서비스워커 / PWA 캐시
- [x] 근본 원인 발견 — 기존 SW(v9)가 전부 cache-first라 폰이 옛 코드에 갇힘
- [x] SW 교체 — HTML은 network-first(항상 최신), 그 외 cache-first
- [x] index.html: SW 해제 코드 → 등록 + 자동 업데이트로 교체
- [x] Supabase/Google 요청은 SW가 안 건드리게 처리
- [x] 앞으로 배포 시 CACHE_VERSION 숫자만 올리면 폰 자동 갱신

### 카테고리 부활 버그 (대형 디버깅)
- [x] 근본 원인 3개 규명
  - loadAll이 localStorage 비면 DEFAULT_CATS를 새 UUID로 심음
  - 🌱 신규유저 시드도 같은 문제
  - 기기 로컬 잔해가 동기화 때마다 새 id로 재push
- [x] 클라우드 직접 카테고리(gcal_key null) 전부 DELETE(영구삭제)
- [x] loadAll을 빈 배열로 시작하게 수정
- [x] 🌱 시드 코드 제거
- [x] 폰 PWA 삭제로 옛 서비스워커 제거 (사파리 데이터 지우기로는 SW 안 죽음 ← 교훈)
- [x] 최종 검증: 삭제하면 양쪽서 사라지고 새로고침해도 부활 안 함(stick)

---

## ⬜ 할 일

### 가벼운 정리
- [ ] 콘솔 디버그 로그 정리 (✅로그인 / 📥pull / ☁️push 줄이거나 끄기)
- [ ] `onAuthStateChange` 중복 발화 정리 (로그인 시 pull 3회 → 가드로 1회)
- [ ] 노란 경고 해소 — `<meta name="mobile-web-app-capable" content="yes">` 추가

### 멀티유저 대비 (구조)
- [ ] 기본 카테고리 시드 재설계 — 신규 유저엔 기본 카테고리 주되 **부활 안 하는 방식**으로 (가입 1회만, 플래그 잠금 등)
- [ ] 신규 가입 / 온보딩 플로우

### 기능 추가
- [ ] .ics 내보내기 (events → .ics, 비상백업 + 아이폰 캘린더 연동)
- [ ] 애플펜슬 자유필기 (아이패드, pointerType='pen', 좌표 JSON을 Supabase 저장)
  - [ ] 방법 A — 화면 앵커 (쉬움, 먼저)
  - [ ] 방법 B — 날짜셀 앵커 (좌표 정규화, 나중)

---

## 📌 기억해둘 교훈 / 주의사항
- 폰 PWA는 **앱 자체를 삭제**해야 옛 서비스워커가 죽음 (사파리 웹사이트 데이터 지우기로는 안 됨)
- 직접 카테고리(gcal_key null)는 id 매칭, 구글 카테고리는 gcal_key 매칭
- 데이터 직접 수정은 항상 **상태 확인 SQL 먼저** → 그다음 변경 (두더지 잡기 방지)
- 코드 수정은 Ctrl+F before/after 스니펫 방식, 전체 덤프 X
- Clara user_id: `265f1a9c-99f4-47cb-8dbe-50beb854ac1d`
