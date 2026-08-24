import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/styles/base-rhea/ui/field"
import { Input } from "@/styles/base-rhea/ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-rhea/ui/item"

export function AccountAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 접근</CardTitle>
        <CardDescription>자격 증명을 바꾸거나 다시 인증하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-address">이메일 주소</FieldLabel>
            <Input
              id="email-address"
              type="email"
              placeholder="artist@studio.inc"
            />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="current-password">현재 비밀번호</FieldLabel>
              <a
                href="#"
                className="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
              >
                잊으셨나요?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••••••••••••••••••"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <HugeiconsIcon icon={SquareLock02Icon} strokeWidth={2} />
          보안 설정 저장
        </Button>
        <Item variant="muted" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              className="text-destructive"
              strokeWidth={2}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>위험 구역</ItemTitle>
            <ItemDescription className="line-clamp-1">
              계정을 보관하고 카탈로그를 지웁니다
            </ItemDescription>
          </ItemContent>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-4"
            strokeWidth={2}
          />
        </Item>
      </CardFooter>
    </Card>
  )
}
