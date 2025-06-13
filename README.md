# 프로젝트 이름

코딩테스트 준비를 더 쉽고 편리하게!
코딩테스트 문제 풀이, AI 코드 리뷰, 깃허브 연동을 통한 자동 push,
사용자간 상호작용(채팅, 랭킹 등)
(사용자 편의성을 중점으로 하는 코딩 테스트 사이트)

## 예상 일정

2025.06.13 ~ 2025.06.27 MVP 개발

## 기술 스택

- Frontend: React v19, Next.js 15, TypeScript, TailwindCSS Node v22, Shadcn/ui, TanStack Query, Zustandpnpm

- Team Tool: Discode, Jira, Notion

현재 진행도
디자인: 러프한 Figma 디자인 https://buly.kr/1c9EwQg
프론트엔드: 회원가입/로그인/채팅/검색/문제풀이 기본 HTML (아주 간단한 기능 시연용)
Frontend Github: https://github.com/ezcode-my/frontend
백엔드: MVP 완료, 기능 고도화 작업중, API 문서 정리중
Backend Github: https://github.com/ezcode-my/backend
swagger: http://3.38.223.188/swagger-ui/index.html

### MVP

황재연: 메인페이지
김정하: 로그인/회원가입
유선향: 채팅

### 프로젝트 구조

```
src/
├── app/
│   ├── main/        # 메인 페이지
│   ├── login/       # 로그인 관련 페이지
│   ├── chat/        # 채팅 관련 페이지
│   └── signup/      # 회원가입 관련 페이지
├── components/        # 공통 컴포넌트
├── lib/               # 유틸리티 함수
└── store/             # Zustand 스토어
```

### 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버 실행
- `pnpm lint`: 린트 검사
- `pnpm lint:fix`: 린트 검사 및 수정
- `pnpm format`: 코드 포맷팅
- `pnpm type-check`: 타입 체크
