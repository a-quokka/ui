"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui-rtl/tooltip"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      content: "Add to library",
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
      content: "라이브러리에 추가",
      "inline-start": "시작 쪽",
      left: "왼쪽",
      top: "위",
      bottom: "아래",
      right: "오른쪽",
      "inline-end": "끝 쪽",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalSides = ["inline-start", "inline-end"] as const

export function TooltipRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {physicalSides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {t[side]}
            </TooltipTrigger>
            <TooltipContent side={side} dir={dir}>
              {t.content}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {logicalSides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {t[side]}
            </TooltipTrigger>
            <TooltipContent side={side} dir={dir}>
              {t.content}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
