"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/styles/base-nova/ui-rtl/hover-card"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      trigger: "무선 헤드폰",
      name: "Wireless Headphones",
      price: "$99.99",
      "inline-start": "Inline Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      "inline-end": "Inline End",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      trigger: "무선 헤드폰",
      name: "무선 헤드폰",
      price: "129,000원",
      "inline-start": "Inline Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      "inline-end": "Inline End",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalSides = ["inline-start", "inline-end"] as const

export function HoverCardRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {physicalSides.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={10}
              closeDelay={100}
              render={<Button variant="outline" />}
            >
              {t[side]}
            </HoverCardTrigger>
            <HoverCardContent
              side={side}
              className="flex w-64 flex-col gap-1"
              dir={dir}
            >
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.price}</div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {logicalSides.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={10}
              closeDelay={100}
              render={<Button variant="outline" />}
            >
              {t[side]}
            </HoverCardTrigger>
            <HoverCardContent
              side={side}
              className="flex w-64 flex-col gap-1"
              dir={dir}
            >
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.price}</div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
