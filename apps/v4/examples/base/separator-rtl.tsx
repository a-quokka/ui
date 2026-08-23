"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Separator } from "@/styles/base-nova/ui-rtl/separator"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "shadcn/ui",
      subtitle: "The Foundation for your Design System",
      description:
        "A set of beautifully designed components that you can customize, extend, and build on.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      title: "shadcn/ui",
      subtitle: "디자인 시스템의 토대",
      description:
        "원하는 대로 고치고 확장해 쓸 수 있는, 잘 다듬어진 컴포넌트 모음입니다.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "الأساس لنظام التصميم الخاص بك",
      description:
        "مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "הבסיס למערכת העיצוב שלך",
      description:
        "סט של רכיבים מעוצבים בצורה יפה שאתה יכול להתאים אישית, להרחיב ולבנות עליהם.",
    },
  },
}

export function SeparatorRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm" dir={dir}>
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">{t.title}</div>
        <div className="text-muted-foreground">{t.subtitle}</div>
      </div>
      <Separator />
      <div>{t.description}</div>
    </div>
  )
}
