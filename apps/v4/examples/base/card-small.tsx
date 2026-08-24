import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"

export function CardSmall() {
  const featureName = "Scheduled reports"

  return (
    <Card size="sm" className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>{featureName}</CardTitle>
        <CardDescription>
          매주 자동으로 모아 드립니다. 직접 내보낼 필요가 없습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 py-2 text-sm">
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>주기를 고르세요(매일 또는 매주).</span>
          </li>
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>채널이나 특정 팀원에게 보냅니다.</span>
          </li>
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>차트, 표, 핵심 지표를 함께 담습니다.</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button size="sm" className="w-full">
          정기 리포트 설정
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          새로운 소식 보기
        </Button>
      </CardFooter>
    </Card>
  )
}
