import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/styles/base-nova/ui/avatar"
import { Button } from "@/styles/base-nova/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-nova/ui/empty"

export default function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>오프라인 사용자</EmptyTitle>
        <EmptyDescription>
          이 사용자는 지금 오프라인입니다. 메시지를 남겨 두거나 나중에 다시
          시도하세요.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">메시지 남기기</Button>
      </EmptyContent>
    </Empty>
  )
}
