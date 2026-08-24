"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/styles/base-nova/ui-rtl/collapsible"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      orderNumber: "Order #4189",
      status: "Status",
      shipped: "Shipped",
      shippingAddress: "Shipping address",
      address: "100 Market St, San Francisco",
      items: "Items",
      itemsDescription: "2x Studio Headphones",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      orderNumber: "주문 #4189",
      status: "상태",
      shipped: "배송 중",
      shippingAddress: "배송지",
      address: "서울시 중구 세종대로 110",
      items: "상품",
      itemsDescription: "스튜디오 헤드폰 2개",
    },
  },
}

export function CollapsibleRtl() {
  const { dir, t } = useTranslation(translations, "ko")
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
      dir={dir}
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">{t.orderNumber}</h4>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon" className="size-8" />}
        >
          <ChevronsUpDown />
          <span className="sr-only">상세 보기</span>
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span className="text-muted-foreground">{t.status}</span>
        <span className="font-medium">{t.shipped}</span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">{t.shippingAddress}</p>
          <p className="text-muted-foreground">{t.address}</p>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">{t.items}</p>
          <p className="text-muted-foreground">{t.itemsDescription}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
