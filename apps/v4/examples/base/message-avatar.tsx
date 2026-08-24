import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/styles/base-rhea/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@/styles/base-rhea/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/styles/base-rhea/ui/message"

export function MessageAvatarDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/avatars/03.png" alt="@avatar" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              의존성을 설치하다가 빌드가 실패했어요.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/avatars/10.png" alt="@avatar" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>정확한 오류 메시지를 보여 줄래요?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/avatars/03.png" alt="@avatar" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>로그에 찍힌 오류예요</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>
                빌드에 문제가 생겼습니다. 라이브러리가 제대로 설치되지 않았어요.
                빌드를 다시 돌려 보세요.
              </BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </div>
  )
}
