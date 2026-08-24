"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/styles/base-nova/ui-rtl/popover"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "크기",
      description: "레이어의 크기를 정합니다.",
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
      title: "크기",
      description: "레이어의 크기를 정합니다.",
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

export function PopoverRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {physicalSides.map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline" />}>
              {t[side]}
            </PopoverTrigger>
            <PopoverContent side={side} dir={dir}>
              <PopoverHeader>
                <PopoverTitle>{t.title}</PopoverTitle>
                <PopoverDescription>{t.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {logicalSides.map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline" />}>
              {t[side]}
            </PopoverTrigger>
            <PopoverContent side={side} dir={dir}>
              <PopoverHeader>
                <PopoverTitle>{t.title}</PopoverTitle>
                <PopoverDescription>{t.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}
