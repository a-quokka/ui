"use client"

import { createChat, getMessageText } from "@/lib/ai"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/styles/base-rhea/ui/hover-card"
import { Message, MessageContent } from "@/styles/base-rhea/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "@/styles/base-rhea/ui/message-scroller"

const chat = createChat()
  .user("장애 인수인계를 보고 무엇부터 읽어야 할지 알려 주세요.", {
    id: "vis-brief",
  })
  .assistant(
    "요약과 영향 절부터 보세요. 업로드 대기열에 문제가 있었지만 대기 중이던 작업은 모두 복구가 끝났습니다."
  )
  .user("고객에게는 어떤 영향이 있었나요?", {
    id: "vis-impact",
  })
  .assistant(
    "영향은 처리 지연에 그쳤습니다.\n\n유실된 기록은 없고 대사 작업자가 재시도 배치를 하나씩 확인했습니다. 고객 두 분이 혼란을 겪었지만 결제나 청구 오류는 없었습니다."
  )
  .user("남은 조치는 무엇인가요?", {
    id: "vis-actions",
  })
  .assistant(
    "다음 배포까지 재시도 구간을 켜 두고, 장기 대책으로 대기열 깊이 경보를 붙이세요.\n\n경보는 짧게 튀는 한 번이 아니라 꾸준히 늘어날 때 울려야 합니다."
  )
  .user("후속 조치 목록을 주세요.", {
    id: "vis-checklist",
  })
  .assistant(
    "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\n다음 배포까지 재시도 구간을 켜 두고, 장기 대책으로 대기열 깊이 경보를 붙이세요.\n\n경보는 짧게 튀는 한 번이 아니라 꾸준히 늘어날 때 울려야 합니다."
  )

const messages = chat.get()
const userMessages = messages.filter((message) => message.role === "user")

export function MessageScrollerVisibility() {
  return (
    <MessageScrollerProvider scrollMargin={12}>
      <div className="relative flex flex-col gap-4">
        <div className="relative mx-auto w-full max-w-sm">
          <Card className="h-140 w-full gap-0">
            <CardHeader className="gap-1 border-b">
              <CardTitle>기록 목차</CardTitle>
              <CardDescription>현재 고정된 턴을 따라갑니다.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent className="p-(--card-spacing)">
                    {messages.map((message) => {
                      const isUserMessage = message.role === "user"
                      const text = getMessageText(message)

                      return (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                          scrollAnchor={isUserMessage}
                        >
                          <Message align={isUserMessage ? "end" : "start"}>
                            <MessageContent>
                              <Bubble
                                variant={isUserMessage ? "muted" : "ghost"}
                              >
                                <BubbleContent className="space-y-2">
                                  {text
                                    .split(/\n\s*\n/)
                                    .map((paragraph) => paragraph.trim())
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                      <p
                                        key={index}
                                        className="whitespace-pre-wrap"
                                      >
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
            </CardContent>
          </Card>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2">
            <TranscriptOutline />
          </div>
        </div>
        <div className="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
          목차를 열면 읽으면서 고정된 턴 사이를 오갈 수 있습니다.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}

function TranscriptOutline() {
  const { scrollToMessage } = useMessageScroller()
  const { currentAnchorId } = useMessageScrollerVisibility()

  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <button
            type="button"
            aria-label="기록 목차 열기"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        }
      >
        {userMessages.map((message) => (
          <span
            key={message.id}
            data-current={message.id === currentAnchorId}
            className="h-0.5 w-4 rounded-full bg-muted-foreground/40 data-[current=true]:bg-foreground"
          />
        ))}
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="left"
        sideOffset={-28}
        className="flex w-64 flex-col gap-1 rounded-2xl p-1"
      >
        {userMessages.map((message) => (
          <button
            key={message.id}
            type="button"
            aria-current={
              currentAnchorId === message.id ? "location" : undefined
            }
            className="flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground"
            onClick={() =>
              scrollToMessage(message.id, {
                align: "start",
                behavior: "smooth",
              })
            }
          >
            <span className="line-clamp-1 min-w-0">
              {getTrimmedMessageText(message)}
            </span>
          </button>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}

function getTrimmedMessageText(message: (typeof userMessages)[number]) {
  const text = getMessageText(message)

  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}
