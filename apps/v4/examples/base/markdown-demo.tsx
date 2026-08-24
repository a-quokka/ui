"use client"

import { Markdown } from "@/components/markdown"

const markdown = `## 시작하기

마크다운은 간단한 문법으로 서식 있는 글을 쓰게 해 줍니다.

### 무엇을 쓸 수 있나요

- **굵게** 와 *기울임* 글자
- [링크](https://example.com) 와 \`인라인 코드\`
- 번호 목록과 글머리 목록
- 표, 인용, 코드 블록

| 문법 | 결과 |
| --- | --- |
| \`**굵게**\` | **굵게** |
| \`*기울임*\` | *기울임* |
| \`\`코드\`\` | \`코드\` |

인용은 이렇게 보입니다.

> 마크다운을 익히는 가장 좋은 방법은 직접 써 보는 것입니다. 이 문장은 자리를 채우기 위한 예시 문장입니다.

이번에는 코드 블록입니다. 줄 번호와 복사 버튼, 문법 강조가 함께 나와야 합니다.

\`\`\`tsx
export function Greeting({ name }: { name: string }) {
  return <p>안녕하세요, {name}님!</p>
}
\`\`\`

플러그인을 더 쓰고 싶다면 \`Markdown\` 컴포넌트에 넘기면 됩니다.
`

export function MarkdownDemo() {
  return (
    <div className="max-w-md">
      <Markdown>{markdown}</Markdown>
    </div>
  )
}
