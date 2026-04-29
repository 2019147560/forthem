# 곁에·다나 — Next.js 변환본

은둔·고립청년 지원사업 통합 정보 플랫폼

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (Header, Footer 포함)
│   ├── page.tsx                  # 홈 — 지원사업 검색
│   ├── support/
│   │   └── page.tsx              # 제도 안내
│   ├── my/
│   │   └── page.tsx              # 마이페이지
│   └── programs/
│       └── [id]/
│           ├── page.tsx          # 사업 상세
│           └── apply/
│               └── page.tsx      # 신청 플로우
├── components/
│   ├── Header.tsx                # 상단 헤더 + 유틸리티 바
│   ├── Footer.tsx                # 푸터
│   ├── Crumb.tsx                 # 브레드크럼
│   ├── ReviewStrip.tsx           # 참여 후기 자동 슬라이드
│   ├── Poster.tsx                # 사업 포스터 SVG 컴포넌트
│   └── ui/
│       ├── Icon.tsx              # 인라인 SVG 아이콘
│       └── Mascot.tsx            # 마스코트 SVG
├── lib/
│   └── data.ts                   # 사업/후기/제도 데이터
├── types/
│   └── index.ts                  # TypeScript 타입 정의
└── styles/
    └── globals.css               # 전역 CSS (기존 styles.css 기반)
```

## 원본 → Next.js 변환 요약

| 원본 파일 | Next.js 위치 | 변경 사항 |
|---|---|---|
| `data.jsx` | `lib/data.ts` | `window.*` 전역 → named export, TS 타입 추가 |
| `icons.jsx` | `components/ui/Icon.tsx` | `window.Icon` 제거, props 타입 추가 |
| `mascots.jsx` | `components/ui/Mascot.tsx` | 동일 |
| `header.jsx` | `components/Header.tsx` | `useRouter`, Next.js `Link` 사용, active tab → `usePathname` |
| `home.jsx` | `app/page.tsx` | `'use client'`, `window.PROGRAMS` → import |
| `views.jsx` (Detail) | `app/programs/[id]/page.tsx` | Server Component, `params` prop |
| `views.jsx` (Apply) | `app/programs/[id]/apply/page.tsx` | `'use client'`, 멀티스텝 폼 |
| `views.jsx` (Support) | `app/support/page.tsx` | `'use client'` |
| `views.jsx` (My) | `app/my/page.tsx` | `'use client'` |
| `app.jsx` | `app/layout.tsx` + 각 page | 라우팅 → App Router |
| `styles.css` | `styles/globals.css` | 그대로 + Next.js용 추가 CSS |
| `tweaks-panel.jsx` | 제거 | 프로덕션 코드에서 불필요 |

## 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 라우팅

| URL | 화면 |
|---|---|
| `/` | 지원사업 검색 (홈) |
| `/programs/p01` | 사업 상세 |
| `/programs/p01/apply` | 신청 플로우 |
| `/support` | 제도 안내 |
| `/my` | 마이페이지 |
