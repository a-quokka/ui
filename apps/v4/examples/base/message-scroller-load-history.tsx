"use client"

import * as React from "react"
import { RotateCwIcon } from "lucide-react"
import { toast } from "sonner"

import { createChat, getMessageText } from "@/lib/ai"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
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
import { Marker, MarkerContent } from "@/styles/base-rhea/ui/marker"
import { Message, MessageContent } from "@/styles/base-rhea/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/styles/base-rhea/ui/message-scroller"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-rhea/ui/tooltip"

const chat = createChat()
  .user("장애 채널 내용을 정리해 줄 수 있나요?")
  .assistant(
    "첫 경보는 지연된 내보내기 작업이었습니다. 09:42 UTC 무렵부터 밀리기 시작했고 재시도 대기열이 기준을 넘으면서 경고가 떴습니다.\n\n결제 화면에는 영향이 없었지만 큰 워크스페이스의 내보내기가 12분쯤 늦어졌습니다."
  )
  .user("결제에는 영향이 있었나요?")
  .assistant(
    "결제 오류는 보고되지 않았습니다. 결제 승인·주문 생성·확인 메일 모두 평소 지연 범위 안에 있었습니다.\n\n올라간 지표는 내보내기 대기열 깊이 하나뿐이고, 이는 결제가 아니라 분석 자료 내려받기와 이어집니다."
  )
  .user("직전 배포에서 무엇이 바뀌었나요?")
  .assistant(
    "내보내기 대기열 작업자만 바뀌었습니다. 큰 CSV 작업이 공용 재시도 정책으로 옮겨지면서 실패할 때마다 작업자 자리를 전보다 오래 붙잡게 됐습니다.\n\n결제·가격·청구 API 는 이번 배포에 들어 있지 않았습니다."
  )
  .user("롤백해야 할까요?")
  .assistant(
    "아직은 아닙니다. 재시도 동시성을 줄인 뒤로 대기열이 회복 중이고, 가장 오래 기다린 작업도 이제 5분 미만입니다.\n\n대기열이 다시 늘면 바로 롤백할 수 있게 준비만 해 두세요. 지금 흐름은 회복 쪽입니다."
  )
  .user("고객에게 보이는 문제가 없는지 계속 지켜봐 주세요.")
  .assistant(
    "앞으로 15분 더 대기열과 고객 문의 태그를 보겠습니다. 내보내기 실패, 지연된 내려받기 요청, 보고서가 안 온다는 문의를 함께 추적합니다.\n\n다음 배치 구간까지 조용하면 내부 성능 저하로 닫아도 되겠습니다."
  )

const history = chat.get()
const INITIAL_VISIBLE_COUNT = 5

export function MessageScrollerLoadHistory() {
  const [demoKey, setDemoKey] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT)
  const visibleMessages = history.slice(-visibleCount)
  const canLoadHistory = visibleCount < history.length

  return (
    <MessageScrollerProvider>
      <div className="relative flex flex-col gap-4">
        <Card className="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>이전 기록 불러오기</CardTitle>
            <CardDescription>
              앞쪽에 메시지가 붙어도 읽던 자리가 유지됩니다.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="불러온 메시지 초기화"
                      disabled={visibleCount === INITIAL_VISIBLE_COUNT}
                      onClick={() => {
                        setVisibleCount(INITIAL_VISIBLE_COUNT)
                        setDemoKey((key) => key + 1)
                      }}
                    />
                  }
                >
                  <RotateCwIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>초기화</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <MessageScroller key={demoKey}>
              <MessageScrollerViewport>
                <MessageScrollerContent className="p-(--card-spacing)">
                  {visibleMessages.map((message) => {
                    const isUserMessage = message.role === "user"

                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                      >
                        <Message align={isUserMessage ? "end" : "start"}>
                          <MessageContent>
                            <Bubble variant={isUserMessage ? "muted" : "ghost"}>
                              <BubbleContent className="space-y-2">
                                {getMessageText(message)
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
                  <MessageScrollerItem scrollAnchor={false}>
                    <Marker variant="separator">
                      <MarkerContent>대화의 끝</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2 border-t">
            <Button
              type="button"
              disabled={!canLoadHistory}
              onClick={() => {
                setVisibleCount(history.length)
                toast("이전 기록을 불러왔습니다", {
                  description: "위로 올리면 이전 메시지를 볼 수 있습니다.",
                })
              }}
              className="w-full"
              variant="secondary"
            >
              {canLoadHistory ? "Load History" : "History Loaded"}
            </Button>
            <p className="text-xs text-muted-foreground">
              읽던 자리를 지키면서 이전 메시지를 되살립니다.
            </p>
          </CardFooter>
        </Card>
        <div className="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
          이전 기록 불러오기를 누르면 대화 전체를 불러옵니다
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
