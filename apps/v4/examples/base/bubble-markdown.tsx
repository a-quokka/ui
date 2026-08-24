import { Markdown } from "@/components/markdown"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"

export function BubbleMarkdownDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble align="end" variant="muted">
        <BubbleContent>
          <Markdown>{`안녕하세요. 정말 **생각**하고 있나요?`}</Markdown>
        </BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          <Markdown>{`고스트 말풍선은 어시스턴트 글과 **마크다운**처럼 테두리를 두르지 않아야 하는 내용에 씁니다.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render \`code\` in it.

Ghost bubbles are full width and can take the full width of the container.
`}</Markdown>
        </BubbleContent>
      </Bubble>
    </div>
  )
}
