import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from "@/styles/base-rhea/ui/item"
import { Progress } from "@/styles/base-rhea/ui/progress"

export function SavingsTargets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>저축 목표</CardTitle>
        <CardDescription>
          포트폴리오 전체의 2024년 진행 중인 이정표입니다. 저축 목표에 얼마나
          가까워졌는지 살펴보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-3">
          <Item
            role="listitem"
            variant="muted"
            className="flex-col items-stretch"
          >
            <ItemContent className="gap-3">
              <ItemDescription className="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
                은퇴
              </ItemDescription>
              <span className="text-3xl font-semibold tabular-nums">
                $420,000
              </span>
              <Progress value={65} aria-label="은퇴 저축 진행률" />
            </ItemContent>
            <ItemFooter>
              <span className="text-sm text-muted-foreground">
                65% achieved
              </span>
              <span className="text-sm font-medium tabular-nums">$273,000</span>
            </ItemFooter>
          </Item>
          <Item
            role="listitem"
            variant="muted"
            className="flex-col items-stretch"
          >
            <ItemContent className="gap-3">
              <ItemDescription className="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
                부동산
              </ItemDescription>
              <span className="text-3xl font-semibold tabular-nums">
                $85,000
              </span>
              <Progress value={32} aria-label="부동산 저축 진행률" />
            </ItemContent>
            <ItemFooter>
              <span className="text-sm text-muted-foreground">
                32% achieved
              </span>
              <span className="text-sm font-medium tabular-nums">$27,200</span>
            </ItemFooter>
          </Item>
        </ItemGroup>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-center">
          올해 목표에는 아직 이르지 못했습니다.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
