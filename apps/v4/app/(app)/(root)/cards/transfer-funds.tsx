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
import { Field, FieldGroup, FieldLabel } from "@/styles/base-rhea/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/styles/base-rhea/ui/input-group"
import { Item, ItemContent } from "@/styles/base-rhea/ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-rhea/ui/select"
import { Separator } from "@/styles/base-rhea/ui/separator"

const FROM_ACCOUNTS = [
  { label: "주 입출금 (··8402) — $12,450.00", value: "checking" },
  { label: "사업자 (··7731) — $8,920.00", value: "business" },
]

const TO_ACCOUNTS = [
  { label: "고금리 예금 (··1192) — $42,100.00", value: "savings" },
  { label: "투자 (··3349) — $18,200.00", value: "investment" },
]

export function TransferFunds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>이체</CardTitle>
        <CardDescription>연결된 계좌끼리 돈을 옮깁니다.</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            className="bg-muted"
            aria-label="이체 카드 닫기"
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="transfer-amount">이체 금액</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="transfer-amount" defaultValue="1,200.00" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="from-account">보내는 계좌</FieldLabel>
            <Select items={FROM_ACCOUNTS} defaultValue="checking">
              <SelectTrigger id="from-account" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FROM_ACCOUNTS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="to-account">받는 계좌</FieldLabel>
            <Select items={TO_ACCOUNTS} defaultValue="savings">
              <SelectTrigger id="to-account" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TO_ACCOUNTS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Item variant="muted" className="flex-col items-stretch">
            <ItemContent className="gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">도착 예상</span>
                <span className="text-sm font-medium">오늘, 4월 14일</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  거래 수수료
                </span>
                <span className="text-sm font-medium tabular-nums">$0.00</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">총액</span>
                <span className="text-sm font-semibold tabular-nums">
                  $1,200.00
                </span>
              </div>
            </ItemContent>
          </Item>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">이체 확인</Button>
      </CardFooter>
    </Card>
  )
}
