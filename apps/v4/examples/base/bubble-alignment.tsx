import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"

export function BubbleAlignmentDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>
          이 말풍선은 시작 쪽에 붙습니다. 기본 정렬입니다.
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          이 말풍선은 끝 쪽에 붙습니다. 사용자 메시지에 씁니다.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
