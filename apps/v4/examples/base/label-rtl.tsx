"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Checkbox } from "@/styles/base-nova/ui-rtl/checkbox"
import { Label } from "@/styles/base-nova/ui-rtl/label"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Accept terms and conditions",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "이용약관에 동의합니다",
    },
  },
}

export function LabelRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="flex gap-2" dir={dir}>
      <Checkbox id="terms-rtl" dir={dir} />
      <Label htmlFor="terms-rtl" dir={dir}>
        {t.label}
      </Label>
    </div>
  )
}
