import {
  ArrowRight01Icon,
  Calendar03Icon,
  MoreHorizontalCircle01Icon,
  RefreshIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/styles/base-rhea/ui/breadcrumb"
import { Button } from "@/styles/base-rhea/ui/button"
import { Card, CardContent, CardHeader } from "@/styles/base-rhea/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/styles/base-rhea/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-rhea/ui/item"

export function Payments() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="계정 설정"
                    />
                  }
                >
                  <HugeiconsIcon
                    icon={MoreHorizontalCircle01Icon}
                    strokeWidth={2}
                  />
                  <span className="sr-only">계정 설정</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>프로필</DropdownMenuItem>
                    <DropdownMenuItem>거래 명세서</DropdownMenuItem>
                    <DropdownMenuItem>문서</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>결제</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div role="listitem" className="w-full">
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>이체 한도 변경</ItemTitle>
                <ItemDescription>
                  잔액에서 보낼 수 있는 한도를 조정합니다.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 shrink-0 text-muted-foreground"
                strokeWidth={2}
              />
            </Item>
          </div>
          <div role="listitem" className="w-full">
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>예약 이체</ItemTitle>
                <ItemDescription>
                  나중에 보낼 이체를 예약합니다.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 shrink-0 text-muted-foreground"
                strokeWidth={2}
              />
            </Item>
          </div>
          <div role="listitem" className="w-full">
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>정기 카드 결제</ItemTitle>
                <ItemDescription>
                  반복되는 카드 결제를 관리합니다.
                </ItemDescription>
              </ItemContent>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 shrink-0 text-muted-foreground"
                strokeWidth={2}
              />
            </Item>
          </div>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
