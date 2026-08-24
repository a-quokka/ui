import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-rhea/ui/field"
import { Progress } from "@/styles/base-rhea/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-rhea/ui/select"
import { Textarea } from "@/styles/base-rhea/ui/textarea"

const CURRENCIES = [
  { label: "USD — 미국 달러", value: "usd" },
  { label: "EUR — 유로", value: "eur" },
  { label: "GBP — 영국 파운드", value: "gbp" },
  { label: "JPY — 일본 엔", value: "jpy" },
]

export function PayoutThreshold() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>지급 기준액</CardTitle>
        <CardDescription>지급이 시작되는 최소 잔액을 정합니다.</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            className="bg-muted"
            aria-label="지급 기준액 카드 닫기"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="preferred-currency">기본 통화</FieldLabel>
            <Select items={CURRENCIES} defaultValue="usd">
              <SelectTrigger id="preferred-currency" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <div className="flex items-baseline justify-between">
              <FieldLabel id="min-payout-label">최소 지급 금액</FieldLabel>
              <span className="text-2xl font-semibold tabular-nums">
                $2500.00
              </span>
            </div>
            <Progress
              value={25}
              aria-labelledby="min-payout-label"
              aria-valuetext="$2,500 of $10,000"
            />
            <div className="flex items-center justify-between">
              <FieldDescription>$50 (MIN)</FieldDescription>
              <FieldDescription>$10,000 (MAX)</FieldDescription>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="payout-notes">메모</FieldLabel>
            <Textarea
              id="payout-notes"
              placeholder="이 지급 설정에 남길 메모를 적어 주세요..."
              className="min-h-[100px]"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">기준액 저장</Button>
      </CardFooter>
    </Card>
  )
}
