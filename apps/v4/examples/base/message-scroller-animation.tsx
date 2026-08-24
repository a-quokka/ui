"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCwIcon,
} from "lucide-react"

import { createChat } from "@/lib/ai"
import {
  MESSAGE_ANIMATIONS,
  type MessageAnimationId,
} from "@/lib/message-animations"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-rhea/ui/select"

const chat = createChat()
  .user(
    "고정을 깨지 않으면서 iMessage 처럼 사용자 메시지가 톡 튀어나오게 할 수 있나요?"
  )
  .sleep(1000)
  .assistant(
    "됩니다. 사용자 행은 transform 과 opacity 로 움직이고, 어시스턴트 응답은 그 아래에서 평소대로 흐르게 하세요.\n\n그러면 행 높이 계산이 예측 가능한 채로 남으면서도 새로 보낸 말풍선에 손맛이 생깁니다."
  )
  .user("어떻게 하면 iMessage 에 더 가까운 느낌이 나나요?")
  .sleep(1000)
  .assistant(
    "끝쪽에서 시작하는 짧은 스프링을 쓰세요. 살짝 커지고 조금 위로 올라오되 레이아웃 애니메이션은 넣지 않습니다.\n\n말풍선에는 손맛이 생기지만 측정된 행은 그대로라, 고정과 자동 스크롤이 바뀌는 레이아웃과 싸우지 않아도 됩니다."
  )
  .user("같은 대화를 두고 프리셋을 바꿔 가며 볼 수 있나요?")
  .sleep(1000)
  .assistant(
    "됩니다. 대화를 그대로 둔 채 프리셋만 바꾸고 다음 메시지를 보내면 같은 맥락에서 새 등장 효과를 견줄 수 있습니다.\n\n그러면 은은한 페이드와 경쾌한 팝, 과감한 3D 기울임의 차이를 매번 상황을 다시 만들지 않고도 판단할 수 있습니다."
  )

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 15 })

export function MessageScrollerAnimation() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  })
  const [presetId, setPresetId] = React.useState<MessageAnimationId>("fade")
  const nextMessage = chat.next(messages)
  const isBusy = status === "submitted" || status === "streaming"
  const preset = MESSAGE_ANIMATIONS[presetId as MessageAnimationId]

  return (
    <div className="relative flex flex-col gap-4">
      <Card className="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader className="border-b">
          <CardTitle>애니메이션</CardTitle>
          <CardDescription>
            사용자 메시지가 대화에 붙을 때 어떻게 움직일지 고르세요.
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="애니메이션 초기화"
              disabled={messages.length === 0 || isBusy}
              onClick={() => setMessages(initialMessages)}
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
                <EmptyTitle>아직 메시지가 없습니다</EmptyTitle>
                <EmptyDescription>
                  아래 버튼을 눌러 첫 메시지를 보내세요.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScrollerProvider>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent
                    aria-busy={isBusy}
                    className="p-(--card-spacing)"
                  >
                    {messages.map((message) => (
                      <MessageAnimated
                        key={message.id}
                        message={message}
                        animationPreset={preset}
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
        <CardFooter className="border-t">
          <Select
            value={presetId}
            onValueChange={(value) => {
              setPresetId(value as MessageAnimationId)
            }}
          >
            <SelectTrigger aria-label="애니메이션 프리셋">
              <SelectValue>{preset.name}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start" side="top">
              <SelectGroup>
                {Object.values(MESSAGE_ANIMATIONS).map((animation) => (
                  <SelectItem key={animation.id} value={animation.id}>
                    {animation.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="button"
            size="icon"
            className="ml-auto"
            disabled={!nextMessage || isBusy}
            onClick={() => {
              if (!nextMessage || isBusy) {
                return
              }

              void sendMessage(nextMessage)
            }}
          >
            <ArrowUpIcon />
            <span className="sr-only">메시지 보내기</span>
          </Button>
        </CardFooter>
      </Card>
      <div className="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
        애니메이션을 고르고 보내기를 누르면 동작을 볼 수 있습니다.
      </div>
    </div>
  )
}
