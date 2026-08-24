"use client"

import { useChat } from "@ai-sdk/react"
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
    "앱에 채팅을 붙이고 있는데 스크롤 때문에 미치겠어요. AI 답변이 흘러 들어올 때마다 대화 전체가 튑니다."
  )
  .sleep(1000)
  .assistant(
    "스트리밍 채팅에서 늘 나오는 문제입니다. 메시지 목록을 `MessageScroller` 로 감싸고 `autoScroll` 을 켜 보세요. 토큰이 도착하는 동안 뷰포트가 맨 아래에 붙어 있어서 새로 도착한 글자가 늘 보입니다.\n\n중요한 건 읽는 사람이 이미 맨 아래에 있을 때만 따라간다는 점입니다. 위로 올려 예전 내용을 읽기 시작하면 자동 스크롤이 물러나고 그 자리를 지켜 줍니다. 사용자의 의도와 싸우지 않으면서 스트리밍이 매끄럽게 흐릅니다."
  )
  .user(
    "그런데 새 메시지를 보내면 여전히 화면이 덜컥거려요. 대화 전체가 위에서부터 다시 불러와지는 느낌입니다."
  )
  .sleep(1000)
  .assistant(
    "그건 `MessageScrollerItem` 의 턴 고정으로 해결합니다. 무작정 문서 맨 아래로 붙이는 대신, 위쪽에 자리 잡아야 할 턴에 `scrollAnchor` 를 지정하세요.\n\n앵커 위에는 직전 대화가 조금 남아 있어서 맥락을 잃지 않습니다. 평범한 overflow 컨테이너에서 겪는 그 어지러운 점프 없이 답변이 화면 안에서 시작됩니다."
  )
  .user(
    "예전 답변을 다시 읽으려고 위로 올린 경우에는요? 억지로 아래로 끌어내리고 싶지는 않아요."
  )
  .sleep(1000)
  .assistant(
    "그럴 일 없습니다. 자동 스크롤은 뷰포트가 이미 맨 아래에 붙어 있을 때만 동작하니, 위로 올리는 행동 자체가 '따라가지 않겠다' 는 선택이 됩니다. 아래에서 새 토큰이 계속 도착해도 읽던 자리는 그대로입니다.\n\n아직 못 본 내용이 있으면 뷰포트 아래에 `MessageScrollerButton` 이 나타납니다. 한 번 누르면 최신 메시지로 돌아가고 자동 스크롤도 다시 켜집니다. Slack 이나 iMessage 와 같은 방식입니다. 다 따라잡았을 때는 조용하고, 그렇지 않을 때만 나섭니다."
  )
  .user("마지막으로, 보조 기술에서도 잘 동작하나요?")
  .sleep(1000)
  .assistant(
    '`MessageScrollerContent` 는 기본으로 `role="log"` 와 `aria-relevant="additions"` 를 지정해서, 새 메시지가 도착하는 대로 스크린 리더가 읽어 줍니다.\n\n스크롤 버튼은 sr-only 라벨이 붙은 진짜 `<button>` 이고, 이미 맨 아래에 있으면 탭 순서에서 빠집니다. 쓸모없는 포커스 정거장이 생기지 않습니다.'
  )
const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export function MessageScrollerDemo() {
  const { messages, sendMessage, status, setMessages } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
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
                        대기 중인 메시지가 없습니다. 대화를 초기화하세요.
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
