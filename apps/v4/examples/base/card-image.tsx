import { Badge } from "@/styles/base-nova/ui/badge"
import { Button } from "@/styles/base-nova/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"

export function CardImage() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="행사 표지"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">추천</Badge>
        </CardAction>
        <CardTitle>디자인 시스템 밋업</CardTitle>
        <CardDescription>
          컴포넌트 API, 접근성, 그리고 더 빨리 내보내는 방법에 대한 실무
          발표입니다.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">일정 보기</Button>
      </CardFooter>
    </Card>
  )
}
