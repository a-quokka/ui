import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/styles/base-rhea/ui/bubble"

export function BubbleGroupDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>어떤 문제인지 알려 주시겠어요?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble align="end">
          <BubbleContent>그건 네가 알아내야지!</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>어제까지 됐는데. 네가 망가뜨린 거야!</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>버그 찾아서 고쳐 줘.</BubbleContent>
          <BubbleReactions aria-label="반응: 눈" align="start">
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
      <Bubble variant="muted">
        <BubbleContent>
          어제의 당신과 오늘의 당신을 나란히 비교해 드릴까요? 조금 민망할
          텐데요.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
