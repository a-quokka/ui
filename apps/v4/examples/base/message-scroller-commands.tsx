"use client"

import * as React from "react"

import { createChat, getMessageText } from "@/lib/ai"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/styles/base-rhea/ui/dropdown-menu"
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

const chat = createChat()
  .user(
    "워크스페이스를 만든 뒤로 활성화율이 떨어지고 있어요. 어느 단계가 문제일지 찾아 줄 수 있나요?",
    { id: "command-activation" }
  )
  .assistant(
    "가장 크게 떨어지는 구간은 워크스페이스 생성과 첫 동료 초대 사이입니다.\n\n생성 자체는 여전히 건강한데 초대 단계에서 멈춥니다. 사용자가 워크스페이스에 아직 확신이 없는 상태에서 협업을 요구하고 있다는 뜻입니다."
  )
  .user("온보딩 흐름을 바꾸기 전에 무엇을 견줘 봐야 할까요?", {
    id: "command-compare",
  })
  .assistant(
    "세 무리를 견줘 보세요.\n\n1. 동료를 초대하기 전에 템플릿을 고른 사용자\n2. 빈 워크스페이스에서 시작한 사용자\n3. 초대를 건너뛰고 24시간 안에 돌아온 사용자\n\n템플릿을 쓴 쪽이 더 빨리 초대한다면, 초대 안내를 더 크게 띄우는 것보다 첫 사용 안내를 다듬는 게 답일 가능성이 큽니다."
  )
  .user("그걸 실험으로 만들어 줄 수 있나요?", {
    id: "command-experiment",
  })
  .assistant(
    "됩니다. 워크스페이스를 만든 뒤 짧은 체크리스트를 보여 주는 변형을 만드세요.\n\n- 템플릿을 고른다\n- 프로젝트 정보를 하나 적는다\n- 워크스페이스에 맥락이 생기면 동료를 초대한다\n\n첫 초대 완료율, 24시간 재방문율, 두 번째 프로젝트 생성 여부를 재면 됩니다."
  )
  .user("초대 안내를 뒤로 미루면 어떤 위험이 있나요?", {
    id: "command-risk",
  })
  .assistant(
    "이미 누구를 초대할지 아는 계정의 팀 생성이 줄어드는 것이 가장 큰 위험입니다.\n\n그 길을 지키려면 초대 버튼은 헤더에 그대로 두고 빈 화면의 주 안내만 바꾸세요. 확신 있는 팀에는 지름길을 남기면서, 아직 망설이는 사용자를 초대 단계로 너무 일찍 밀어 넣지 않게 됩니다."
  )

const messages = chat.get()
const userMessages = messages.filter((message) => message.role === "user")

export function MessageScrollerCommands() {
  return (
    <MessageScrollerProvider defaultScrollPosition="end">
      <div className="relative flex flex-col gap-4">
        <Card className="mx-auto h-140 w-full max-w-sm gap-0">
          <CardHeader className="gap-1 border-b">
            <CardTitle>명령</CardTitle>
            <CardDescription>기록을 바깥에서 움직입니다.</CardDescription>
            <CardAction>
              <CommandMenu />
            </CardAction>
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
                            <Bubble variant={isUserMessage ? "muted" : "ghost"}>
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
        <div className="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
          컨트롤로 대화의 아무 메시지로나 건너뜁니다.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}

function CommandMenu() {
  const { scrollToMessage } = useMessageScroller()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button type="button" variant="secondary" />}
      >
        이동...
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>대화</DropdownMenuLabel>
          {userMessages.map((message) => (
            <DropdownMenuItem
              key={message.id}
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
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getTrimmedMessageText(message: (typeof userMessages)[number]) {
  const text = getMessageText(message)

  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}
