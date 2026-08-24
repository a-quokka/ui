import {
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/styles/base-rhea/ui/message"

export function MessageActionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              설치 실패는 워크스페이스 패키지에서 나오고 있어요.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="복사" title="복사">
              <CopyIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="좋아요"
              title="좋아요"
            >
              <ThumbsUpIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="싫어요"
              title="싫어요"
            >
              <ThumbsDownIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>링크 주세요. 한번 볼게요...</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span className="font-normal text-destructive">
              보내지 못했습니다
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              title="다시 시도"
              aria-label="다시 시도"
            >
              <RefreshCcwIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
