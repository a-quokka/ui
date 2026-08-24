"use client"

import { toast } from "sonner"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/styles/base-rhea/ui/bubble"
import { Button } from "@/styles/base-rhea/ui/button"

export function BubbleReactionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Bubble variant="muted" align="end">
        <BubbleContent>
          테스트는 필요 없어요. 제 코드는 잘 돌아가거든요.
        </BubbleContent>
        <BubbleReactions
          align="start"
          role="img"
          aria-label="반응: 좋아요, 놀람"
        >
          <span>👍</span>
          <span>😮</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          대담하네요. 알겠어요, 테스트를 좀 붙일게요. 다 되면 알려 드릴게요.
        </BubbleContent>
        <BubbleReactions role="img" aria-label="반응: 눈, 로켓, 그리고 2개 더">
          <span>👀</span>
          <span>🚀</span>
          <span>+2</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>
          테스트가 한 번에 다 통과했어요. 142개 전부요. 좋네요!
        </BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="반응: 축포, 박수"
        >
          <span>🎉</span>
          <span>👏</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>이 명령을 실행해도 될까요?</BubbleContent>
        <BubbleReactions>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => toast.success("You clicked yes, running command...")}
          >
            네, 실행하세요
          </Button>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
