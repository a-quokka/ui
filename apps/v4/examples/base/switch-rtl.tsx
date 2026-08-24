"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui-rtl/field"
import { Switch } from "@/styles/base-nova/ui-rtl/switch"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "여러 기기에서 함께 쓰기",
      description: "집중 모드가 기기 사이에 공유되고, 앱을 벗어나면 꺼집니다.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "여러 기기에서 함께 쓰기",
      description: "집중 모드가 기기 사이에 공유되고, 앱을 벗어나면 꺼집니다.",
    },
  },
}

export function SwitchRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Field orientation="horizontal" className="max-w-sm" dir={dir}>
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode-rtl" dir={dir}>
          {t.label}
        </FieldLabel>
        <FieldDescription dir={dir}>{t.description}</FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode-rtl" dir={dir} />
    </Field>
  )
}
