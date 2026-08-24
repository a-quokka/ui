"use client"

import { toast } from "sonner"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@/styles/base-rhea/ui/bubble"

export function BubbleLinkButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>무엇을 도와드릴까요?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={
              <button onClick={() => toast("비밀번호 찾기를 눌렀습니다")} />
            }
          >
            비밀번호를 잊어버렸어요
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={<button onClick={() => toast("구독 문의를 눌렀습니다")} />}
          >
            구독 관련해서 도움이 필요해요
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={
              <button
                onClick={() =>
                  toast("다른 문의를 눌렀습니다. 상담원에게 연결합니다.")
                }
              />
            }
          >
            다른 문제예요. 상담원과 연결해 주세요.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}
