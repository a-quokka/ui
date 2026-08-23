"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { ScrollArea } from "@/styles/base-nova/ui-rtl/scroll-area"
import { Separator } from "@/styles/base-nova/ui-rtl/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      tags: "Tags",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      tags: "태그",
    },
  },
}

export function ScrollAreaRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <ScrollArea className="h-72 w-48 rounded-md border" dir={dir}>
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">{t.tags}</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
