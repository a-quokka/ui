"use client"

import { createChat } from "@shadcn/helpers/tanstack-ai"
import type { UIMessage } from "@tanstack/ai-client"
import { useChat } from "@tanstack/ai-react"
import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/styles/base-rhea/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-rhea/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/styles/base-rhea/ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/styles/base-rhea/ui/message-scroller"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-rhea/ui/tooltip"

const chat = createChat()
  .user(
    "앱에 채팅을 붙이고 있는데 스크롤 동작 때문에 미치겠어요. AI 가 답을 흘려보낼 때마다 대화 전체가 튑니다."
  )
  .sleep(1000)
  .assistant(({ writer }) => {
    writer.reasoning(
      "스트리밍되는 대화가 계속 화면을 가져가는 상황이군요. 자동 스크롤이 언제 따라가고 언제 멈추는지 설명해야겠습니다."
    )
    writer.sleep(1000)
    writer.text(
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
    )
  })
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

const initialMessages = chat.get(0)
const connection = chat.transport({ delayMs: 20 })

function getMessageText(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.content : ""))
    .join("")
}

export function TanStackAiHelperDemo() {
  const { messages, append, status, setMessages } = useChat({
    initialMessages,
    connection,
  })
  const nextMessage = chat.next(messages)
  const nextMessageText = nextMessage ? getMessageText(nextMessage) : null
  const isBusy = status === "submitted" || status === "streaming"

  return (
    <MessageScrollerProvider>
      <div className="relative flex flex-col gap-4">
        <Card className="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>새 대화</CardTitle>
            <CardDescription>무엇을 도와드릴까요?</CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="대화 초기화"
                      onClick={() => setMessages(initialMessages)}
                      disabled={isBusy}
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
            {messages.length === 0 ? (
              <Empty className="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleDashedIcon />
                  </EmptyMedia>
                  <EmptyTitle>안녕하세요, dropshot 님!</EmptyTitle>
                  <EmptyDescription>
                    오늘은 무엇을 해 볼까요? 보내기를 누르면 새 대화가
                    시작됩니다
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
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
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!nextMessage || isBusy) {
                  return
                }
                void append(nextMessage)
              }}
              className="w-full"
            >
              <InputGroup>
                <InputGroupTextarea
                  aria-label="다음 준비된 메시지"
                  className="h-14 min-h-14 overflow-hidden px-3 py-2.5 opacity-60 data-[status=ready]:opacity-100"
                  data-status={status}
                  placeholder="대기 중인 메시지가 없습니다. 대화를 초기화하세요."
                  value={nextMessageText ?? ""}
                  readOnly
                />
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
          읽기 전용 데모입니다. 보내기를 누르면 다음 메시지가 이어집니다.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
