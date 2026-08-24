import { Badge } from "@/styles/base-rhea/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Item, ItemContent } from "@/styles/base-rhea/ui/item"
import { Separator } from "@/styles/base-rhea/ui/separator"

const netRoyalties = 1248.75
const processingFee = 37.46
const totalClaimable = netRoyalties - processingFee

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export function ClaimableBalance() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>받을 수 있는 잔액</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          ${formatCurrency(totalClaimable)}
        </CardTitle>
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-yellow-500" />
          설정 대기 중
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end">
        <Item variant="muted" className="flex-col items-stretch">
          <ItemContent className="gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">순 저작권료</span>
              <span className="text-sm font-medium tabular-nums">
                ${formatCurrency(netRoyalties)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">처리 수수료</span>
              <span className="text-sm font-medium tabular-nums">
                -${formatCurrency(processingFee)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                지금 받을 수 있는 금액
              </span>
              <span className="text-sm font-semibold tabular-nums">
                ${formatCurrency(totalClaimable)} USD
              </span>
            </div>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <CardDescription>
          은행을 연결하면 $10.00 이상의 잔액은 매달 15일에 자동으로 지급 대상이
          됩니다.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
