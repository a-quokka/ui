"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui-rtl/field"
import { Input } from "@/styles/base-nova/ui-rtl/input"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      apiKey: "API Key",
      placeholder: "sk-...",
      description: "Your API key is encrypted and stored securely.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      apiKey: "API Key",
      placeholder: "sk-...",
      description: "API 키는 암호화해 안전하게 보관합니다.",
    },
  },
}

export function InputRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Field dir={dir}>
      <FieldLabel htmlFor="input-rtl-api-key">{t.apiKey}</FieldLabel>
      <Input
        id="input-rtl-api-key"
        type="password"
        placeholder={t.placeholder}
        dir={dir}
      />
      <FieldDescription>{t.description}</FieldDescription>
    </Field>
  )
}
