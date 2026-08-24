"use client"

import * as React from "react"

import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Message, MessageContent } from "@/styles/base-rhea/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/styles/base-rhea/ui/message-scroller"
import { Tabs, TabsList, TabsTrigger } from "@/styles/base-rhea/ui/tabs"

const messages = [
  {
    id: "open-1",
    role: "user",
    text: "대화에서 사용자가 처음 보낸 메시지입니다.",
  },
  {
    id: "open-2",
    role: "assistant",
    text: "워크스페이스 생성은 8% 늘었는데 첫 초대 완료는 2% 느는 데 그쳤습니다.",
  },
  {
    id: "open-3",
    role: "user",
    text: "대화에서 사용자가 마지막으로 보낸 메시지입니다.",
  },
  {
    id: "open-4",
    role: "assistant",
    text: "초대 단계부터 보세요. 팀들이 워크스페이스는 만들지만 협업자 추가는 미루고 있습니다.\n\n이어서 볼 것:\n\n1. 계정 규모별로 초대 이탈률을 비교합니다.\n2. 초대를 건너뛴 사용자가 24시간 안에 다시 오는지 확인합니다.\n3. 첫 프로젝트 화면의 빈 상태 문구를 점검합니다.\n4. 템플릿별로 활성화를 나눠 봅니다. 템플릿을 쓰는 사용자는 초대가 당장 필요 없을 수 있습니다.\n\n이 흐름이 맞다면 다음 실험은 초대를 더 세게 권하는 쪽이 아니라, 협업이 더 일찍 쓸모 있어지도록 만드는 쪽이어야 합니다.",
  },
] satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

const positions = [
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "last-anchor", label: "last-anchor" },
] satisfies Array<{
  value: "start" | "end" | "last-anchor"
  label: string
}>

export function MessageScrollerOpeningPosition() {
  const [positionKey, setPositionKey] = React.useState(0)
  const [position, setPosition] = React.useState<
    "start" | "end" | "last-anchor"
  >("last-anchor")

  return (
    <div className="relative flex flex-col gap-4">
      <Card className="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader className="gap-1 border-b">
          <CardTitle>여는 위치</CardTitle>
          <CardDescription>저장된 기록을 어디서 열지 고르세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <MessageScrollerProvider>
            <OpeningPositionScroller
              position={position}
              positionKey={positionKey}
            />
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter className="flex items-center justify-center border-t">
          <Tabs
            value={position}
            onValueChange={(value) => {
              if (
                value === "start" ||
                value === "end" ||
                value === "last-anchor"
              ) {
                setPosition(value)
                setPositionKey((key) => key + 1)
              }
            }}
            className="w-full"
          >
            <TabsList className="w-full">
              {positions.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>
      <div className="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
        defaultScrollPosition 을 바꿔 가며 스레드를 열었을 때 기록이 어디서
        시작하는지 확인해 보세요
      </div>
    </div>
  )
}

function OpeningPositionScroller({
  position,
  positionKey,
}: {
  position: "start" | "end" | "last-anchor"
  positionKey: number
}) {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller()

  React.useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (position === "start") {
        scrollToStart({ behavior: "auto" })
        return
      }

      if (position === "end") {
        scrollToEnd({ behavior: "auto" })
        return
      }

      scrollToMessage("open-3", {
        align: "start",
        behavior: "auto",
        scrollMargin: 64,
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [position, positionKey, scrollToEnd, scrollToMessage, scrollToStart])

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent className="p-(--card-spacing)">
          {messages.map((message) => {
            const isUserMessage = message.role === "user"

            return (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={isUserMessage}
              >
                <Message align={isUserMessage ? "end" : "start"}>
                  <MessageContent>
                    <Bubble variant={isUserMessage ? "muted" : "ghost"}>
                      <BubbleContent className="space-y-2">
                        {message.text
                          .split(/\n\s*\n/)
                          .map((paragraph) => paragraph.trim())
                          .filter(Boolean)
                          .map((paragraph, index) => (
                            <p key={index} className="whitespace-pre-wrap">
                              {paragraph}
                            </p>
                          ))}
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            )
          })}
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  )
}
