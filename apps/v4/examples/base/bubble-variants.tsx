import { Markdown } from "@/components/markdown"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/styles/base-rhea/ui/bubble"

export function BubbleVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Bubble>
        <BubbleContent>기본 primary 말풍선입니다.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>secondary 변형입니다.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          이건 muted 입니다. 말풍선에 강조를 낮춘 색을 씁니다.
        </BubbleContent>
        <BubbleReactions role="img" aria-label="반응: 좋아요">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          이건 tinted 입니다. primary 색을 옅게 풀어낸 색을 씁니다.
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>
          테두리가 있는 outline 변형도 쓸 수 있습니다.
        </BubbleContent>
      </Bubble>
      <Bubble variant="destructive" align="end">
        <BubbleContent>반응이 달린 destructive 변형입니다.</BubbleContent>
        <BubbleReactions role="img" aria-label="반응: 불">
          <span>🔥</span>
        </BubbleReactions>
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
