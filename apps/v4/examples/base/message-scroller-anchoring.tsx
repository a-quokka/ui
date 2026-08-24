"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCwIcon,
} from "lucide-react"

import { MessageAnimated } from "@/components/message-animated"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-rhea/ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/styles/base-rhea/ui/message-scroller"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-rhea/ui/toggle-group"

type AnchorRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: AnchorRole
  text: string
}

const scriptedMessages: ChatMessage[] = [
  {
    id: "anchor-1-user",
    role: "user",
    text: "새 질문으로 턴이 시작될 때 앵커가 어떻게 동작하는지 보여 줄래요?",
  },
  {
    id: "anchor-1-assistant",
    role: "assistant",
    text: "먼저 사용자 질문을 붙이고 그다음 어시스턴트 답변을 붙입니다. User 를 고르면 질문이 위쪽에 자리 잡고 그 아래로 답변이 채워집니다.",
  },
  {
    id: "anchor-2-user",
    role: "user",
    text: "어시스턴트 메시지를 앵커로 하면 무엇이 달라지나요?",
  },
  {
    id: "anchor-2-assistant",
    role: "assistant",
    text: "이제 `MessageScroller` 가 화면에 붙잡아 두는 것은 각 어시스턴트 답변입니다. 매 턴마다 답변에 시선이 닿기를 바랄 때 알맞습니다.",
  },
  {
    id: "anchor-3-user",
    role: "user",
    text: "역할을 바꿔 가며 계속 이어 붙일 수 있나요?",
  },
  {
    id: "anchor-3-assistant",
    role: "assistant",
    text: "네. 고른 역할로 다음에 붙는 메시지가 앵커가 되므로, 데모를 초기화하지 않고도 사용자 앵커와 어시스턴트 앵커를 비교할 수 있습니다.",
  },
]

export function MessageScrollerAnchoring() {
  const [anchorRole, setAnchorRole] = React.useState<AnchorRole>("user")
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [messageIndex, setMessageIndex] = React.useState(0)
  const nextMessage = scriptedMessages[messageIndex]

  return (
    <div className="relative flex flex-col gap-4">
      <Card className="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader className="border-b">
          <CardTitle>턴 고정</CardTitle>
          <CardDescription>
            어느 역할이 위쪽에 자리 잡을지 고르세요.
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="앵커 초기화"
              disabled={messages.length === 0}
              onClick={() => {
                setMessages([])
                setMessageIndex(0)
              }}
            >
              <RotateCwIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
          {messages.length === 0 ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleDashedIcon />
                </EmptyMedia>
                <EmptyTitle>아직 앵커가 된 메시지가 없습니다</EmptyTitle>
                <EmptyDescription>
                  첫 메시지를 보내면 고른 역할이 앵커가 되는 걸 볼 수 있습니다.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent className="p-(--card-spacing)">
                    {messages.map((message) => (
                      <MessageAnimated
                        key={message.id}
                        message={message}
                        scrollAnchor={message.role === anchorRole}
                        userVariant="muted"
                        assistantVariant="ghost"
                      />
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </MessageScrollerProvider>
          )}
        </CardContent>
        <CardFooter>
          <ToggleGroup
            aria-label="앵커로 삼을 역할 선택"
            value={[anchorRole]}
            onValueChange={(value) => {
              const nextValue = value[0]

              if (nextValue === "user" || nextValue === "assistant") {
                setAnchorRole(nextValue)
                setMessages([])
                setMessageIndex(0)
              }
            }}
          >
            <ToggleGroupItem value="user" aria-label="사용자 메시지를 앵커로">
              사용자
            </ToggleGroupItem>
            <ToggleGroupItem
              value="assistant"
              aria-label="어시스턴트 메시지를 앵커로"
            >
              어시스턴트
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            type="button"
            size="icon"
            className="ml-auto"
            disabled={!nextMessage}
            onClick={() => {
              if (!nextMessage) {
                return
              }

              setMessages((messages) => [...messages, nextMessage])
              setMessageIndex((index) => index + 1)
            }}
          >
            <ArrowUpIcon />
            <span className="sr-only">메시지 보내기</span>
          </Button>
        </CardFooter>
      </Card>
      <div className="mx-auto max-w-xs px-0.5 text-center text-xs text-muted-foreground">
        앵커 역할을 바꾼 뒤 메시지를 보내 턴이 어디에 자리 잡는지 비교해 보세요.
      </div>
    </div>
  )
}
