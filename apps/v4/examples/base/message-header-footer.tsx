import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/styles/base-rhea/ui/message"

export function MessageHeaderFooterDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <MessageHeader>Olivia</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>로그는 이미 봤어요.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              리포트를 팀에 보내 주세요. 도움이 필요하면 @dropshot 을 부르세요.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <div>
              읽음 <span className="font-normal">어제</span>
            </div>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
