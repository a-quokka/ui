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
              <button onClick={() => toast("You clicked forgot password")} />
            }
          >
            비밀번호를 잊어버렸어요
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={
              <button
                onClick={() => toast("You clicked help with subscription")}
              />
            }
          >
            구독 관련해서 도움이 필요해요
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={
              <button
                onClick={() =>
                  toast("You clicked something else. Talk to a human.")
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
