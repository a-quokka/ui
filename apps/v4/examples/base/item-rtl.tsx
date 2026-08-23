"use client"

import * as React from "react"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-nova/ui-rtl/item"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      basicItem: "Basic Item",
      basicItemDesc: "A simple item with title and description.",
      action: "Action",
      verifiedTitle: "Your profile has been verified.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      basicItem: "기본 아이템",
      basicItemDesc: "제목과 설명이 있는 단순한 아이템입니다.",
      action: "동작",
      verifiedTitle: "프로필 인증이 끝났습니다.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      basicItem: "عنصر أساسي",
      basicItemDesc: "عنصر بسيط يحتوي على عنوان ووصف.",
      action: "إجراء",
      verifiedTitle: "تم التحقق من ملفك الشخصي.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      basicItem: "פריט בסיסי",
      basicItemDesc: "פריט פשוט עם כותרת ותיאור.",
      action: "פעולה",
      verifiedTitle: "הפרופיל שלך אומת.",
    },
  },
}

export function ItemRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="flex w-full max-w-md flex-col gap-6" dir={dir}>
      <Item variant="outline" dir={dir}>
        <ItemContent>
          <ItemTitle>{t.basicItem}</ItemTitle>
          <ItemDescription>{t.basicItemDesc}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            {t.action}
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" render={<a href="#" />} dir={dir}>
        <ItemMedia>
          <BadgeCheckIcon className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{t.verifiedTitle}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  )
}
