"use client"

import { MessageAnimated } from "@/components/message-animated"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@/styles/base-rhea/ui/message-scroller"

const messages = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
})) satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

export function MessageScrollerScrollable() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Card className="h-140 w-full gap-0 overflow-hidden">
        <CardHeader className="gap-1 border-b">
          <CardTitle>스크롤 상태</CardTitle>
          <CardDescription>
            지금 위치에서 어느 쪽으로 더 스크롤할 수 있는지 보여 줍니다.
          </CardDescription>
        </CardHeader>
        <MessageScrollerProvider defaultScrollPosition="start">
          <CardContent className="flex-1 overflow-hidden p-0">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-4 p-(--card-spacing)">
                  <Transcript />
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <ScrollStateFooter />
        </MessageScrollerProvider>
      </Card>
      <div className="px-0.5 text-center text-xs text-muted-foreground">
        기록을 스크롤하면 푸터가 바뀌는 것을 볼 수 있습니다.
      </div>
    </div>
  )
}

function Transcript() {
  return messages.map((message) => (
    <MessageAnimated
      key={message.id}
      message={message}
      scrollAnchor={message.role === "user"}
      userVariant="muted"
      assistantVariant="ghost"
    />
  ))
}

function ScrollStateFooter() {
  const { start, end } = useMessageScrollerScrollable()

  const status = getScrollStatus({ start, end })

  return (
    <CardFooter className="justify-center border-t text-center text-sm text-muted-foreground">
      {status}
    </CardFooter>
  )
}

function getScrollStatus({ start, end }: { start: boolean; end: boolean }) {
  if (start && end) {
    return "You can scroll both ways."
  }

  if (end) {
    return "You are at the top. You can only scroll down."
  }

  if (start) {
    return "You are at the bottom. You can only scroll up."
  }

  return "All messages fit in the viewport."
}
