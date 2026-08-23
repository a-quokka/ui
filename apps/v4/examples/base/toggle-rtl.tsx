"use client"

import * as React from "react"
import { BookmarkIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Toggle } from "@/styles/base-nova/ui-rtl/toggle"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Bookmark",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "북마크",
    },
  },
}

export function ToggleRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" dir={dir}>
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      {t.label}
    </Toggle>
  )
}
