import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/styles/base-rhea/ui/bubble"

export function BubbleDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble align="end">
        <BubbleContent>안녕! 뭐 하고 있어?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>안녕! 말풍선 구경할래?</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            메시지를 묶고, 좌우를 바꾸고, 대화 전체가 한눈에 들어오게 할 수
            있어.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="반응: 좋아요">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
      <Bubble align="end">
        <BubbleContent>좋아. 제일 좋은 걸로 보여 줘.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          지금 보고 있는 게 자기 자신을 보여 주는 데모야. 꽤 메타지.
        </BubbleContent>
        <BubbleReactions
          role="img"
          aria-label="반응: 좋아요, 불, 눈, 그리고 2개 더"
        >
          <span>👍</span>
          <span>🔥</span>
          <span>👀</span>
          <span>+2</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
