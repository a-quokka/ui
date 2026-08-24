"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
} from "lucide-react"

import { createChat, getMessageText } from "@/lib/ai"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/styles/base-rhea/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/styles/base-rhea/ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/styles/base-rhea/ui/message-scroller"
import { Slider } from "@/styles/base-rhea/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-rhea/ui/tooltip"

const DEFAULT_PEEK = 64

const chat = createChat()
  .user(
    "앱에 채팅을 붙이고 있는데 스크롤 동작 때문에 미치겠어요. AI 가 답을 흘려보낼 때마다 대화 전체가 튑니다."
  )
  .sleep(1000)
  .assistant(
    "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
  )
  .user(
    "그런데 새 메시지를 보낼 때도 화면이 덜컹거려요. 대화가 맨 위부터 다시 그려지는 느낌입니다."
  )
  .sleep(1000)
  .assistant(
    "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
  )
  .user(
    "위로 올라가 예전 답을 다시 읽는 중이라면요? 아래로 확 끌어내리고 싶지는 않습니다."
  )
  .sleep(1000)
  .assistant(
    "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
  )
  .user("마지막으로, 보조 기술에서도 잘 동작하나요?")
  .sleep(1000)
  .assistant(
    '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
  )
const initialMessages = chat.get(2)
const transport = chat.transport({ delayMs: 35 })

export function MessageScrollerPreviousContext() {
  const [demoKey, setDemoKey] = React.useState(0)
  const [peek, setPeek] = React.useState(DEFAULT_PEEK)
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
  const isBusy = status === "submitted" || status === "streaming"

  return (
    <MessageScrollerProvider
      key={demoKey}
      scrollMargin={24}
      scrollPreviousItemPeek={peek}
    >
      <div className="relative flex flex-col gap-4">
        <Card className="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>맥락 남겨 두기</CardTitle>
            <CardDescription>
              새 턴이 시작돼도 직전 답변의 일부가 화면에 남습니다.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="예제 초기화"
                      disabled={isBusy}
                      onClick={() => {
                        setMessages(initialMessages)
                        setPeek(DEFAULT_PEEK)
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
                      scrollAnchor={message.role === "user"}
                    />
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!nextMessage || isBusy) {
                  return
                }
                void sendMessage(nextMessage)
              }}
              className="w-full"
            >
              <InputGroup>
                <div className="h-14 w-full px-3 py-2.5">
                  <span
                    className="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
                    data-status={status}
                  >
                    {nextMessage ? (
                      getMessageText(nextMessage)
                    ) : (
                      <span className="text-muted-foreground">
                        대기 중인 메시지가 없습니다. 예제를 초기화하세요.
                      </span>
                    )}
                  </span>
                </div>
                <InputGroupAddon align="block-end" className="pt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <InputGroupButton
                          aria-label="파일 추가"
                          type="button"
                          size="icon-sm"
                          variant="outline"
                        />
                      }
                    >
                      <PlusIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      side="top"
                      className="w-44"
                    >
                      <DropdownMenuItem>
                        <PaperclipIcon />
                        사진·파일 추가
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ImageIcon />
                        이미지 만들기
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TelescopeIcon />
                        심층 리서치
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <GlobeIcon />웹 검색
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex w-28 items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {peek}px
                    </span>
                    <Slider
                      aria-label="직전 맥락 남기기"
                      value={[peek]}
                      min={64}
                      max={128}
                      step={1}
                      disabled={isBusy}
                      onValueChange={(value) => {
                        const nextValue = Array.isArray(value)
                          ? value[0]
                          : value

                        setPeek(nextValue ?? DEFAULT_PEEK)
                      }}
                    />
                  </div>
                  <InputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={!nextMessage || isBusy}
                    className="ml-auto"
                  >
                    <ArrowUpIcon />
                    <span className="sr-only">보내기</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
        <div className="px-0.5 text-center text-xs text-muted-foreground">
          슬라이더를 조절하고 보내 보세요. 직전 메시지가 얼마나 남는지 보입니다
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
