"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/styles/base-nova/ui-rtl/progress"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Upload progress",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "업로드 진행률",
    },
  },
}

export function ProgressRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")

  const formatNumber = (num: number): string => num.toString()

  return (
    <Progress value={56} className="w-full max-w-sm" dir={dir}>
      <ProgressLabel>{t.label}</ProgressLabel>
      <ProgressValue>
        {(value) => (
          <span className="ms-auto">
            {formatNumber(parseFloat(value ?? "0"))}%
          </span>
        )}
      </ProgressValue>
    </Progress>
  )
}
