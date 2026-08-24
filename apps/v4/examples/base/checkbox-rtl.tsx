"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Checkbox } from "@/styles/base-nova/ui-rtl/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/styles/base-nova/ui-rtl/field"
import { Label } from "@/styles/base-nova/ui-rtl/label"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      acceptTerms: "Accept terms and conditions",
      acceptTermsDescription:
        "By clicking this checkbox, you agree to the terms.",
      enableNotifications: "Enable notifications",
      enableNotificationsDescription:
        "You can enable or disable notifications at any time.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      acceptTerms: "이용약관에 동의합니다",
      acceptTermsDescription:
        "이 체크박스를 누르면 약관에 동의하는 것으로 봅니다.",
      enableNotifications: "알림 켜기",
      enableNotificationsDescription: "알림은 언제든 켜고 끌 수 있습니다.",
    },
  },
}

export function CheckboxRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <FieldGroup className="max-w-sm" dir={dir}>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-rtl" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox-rtl">{t.acceptTerms}</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-2-rtl"
          name="terms-checkbox-2"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-2-rtl">
            {t.acceptTerms}
          </FieldLabel>
          <FieldDescription>{t.acceptTermsDescription}</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox-rtl" name="toggle-checkbox" disabled />
        <FieldLabel htmlFor="toggle-checkbox-rtl">
          {t.enableNotifications}
        </FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
          <FieldContent>
            <FieldTitle>{t.enableNotifications}</FieldTitle>
            <FieldDescription>
              {t.enableNotificationsDescription}
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
