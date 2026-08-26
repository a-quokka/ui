# Dropshot 내보내기 결과

`shadcn-ui` 포크에서 `apps/v4/scripts/export-dropshot.mts` 로 뽑은 것이다.
손으로 고치지 마라 — 다시 뽑으면 지워진다. 고칠 것은 포크 쪽 원본을 고친다.

`ds-dropshot` 패키지 구조를 그대로 떴다. 경로가 이미 맞으므로 드롭샷 저장소
루트에 겹쳐 놓기만 하면 된다.

```
packages/design-system/components/Badge/Badge.tsx
packages/design-system/stories/Badge/Badge.stories.ts
packages/design-system/dropshot-ui.css
```

## 옮기는 법

1. `packages/` 를 드롭샷 저장소 루트에 겹쳐 놓는다. 단 **MERGE-REQUIRED.md 에
   적힌 6개 폴더는 빼고** 옮긴다 (기존 것을 덮으면 안 된다)
2. `package.exports.json` 의 항목을 `packages/design-system/package.json` 의
   `exports` 에 합치기
3. 같은 `package.json` 의 `dependencies` 에 `"@base-ui/react": "^1.6.0"` 추가
   (이유는 MERGE-REQUIRED.md 에 적어 두었다)
4. `dropshot-ui.css` 를 앱의 전역 CSS 에서 한 번 import

## 먼저 읽을 것

- `MERGE-REQUIRED.md` — 이름이 겹치는 6개. 덮지 말고 합쳐야 한다
- `../dropshot-pilot/RULES.md` — 드롭샷 코드 규칙과 토큰 매핑표

**이 결과물은 아직 드롭샷 코드 규칙으로 다시 쓰이지 않았다.** shadcn 원형에서
경로·import·export 만 맞춘 상태다. 색·글꼴·prop 이름을 드롭샷 것으로 바꾸는
작업은 `dropshot-pilot/` 에 예시가 있다.
