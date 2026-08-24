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
      ? `스크롤 지점 ${index + 1} 을 봐 주세요.`
      : `지점 ${index + 1} 을 맞췄습니다. 뷰포트가 움직일 때마다 scrollable 훅이 갱신됩니다.\n\n맨 처음 메시지에 있으면 아래쪽만 가리켜야 합니다. 중간으로 오면 양쪽 다 갈 수 있다고 알려 줘야 합니다.\n\n마지막 메시지에서는 다시 위쪽만 가리켜야 합니다.`,
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
    return "맨 위입니다. 아래로만 스크롤할 수 있습니다."
  }

  if (start) {
    return "맨 아래입니다. 위로만 스크롤할 수 있습니다."
  }

  return "All messages fit in the viewport."
}
