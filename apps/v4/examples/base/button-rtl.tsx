"use client"

import { ArrowRightIcon, PlusIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import { Spinner } from "@/styles/base-nova/ui-rtl/spinner"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      button: "Button",
      submit: "Submit",
      delete: "Delete",
      loading: "Loading",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      button: "버튼",
      submit: "제출",
      delete: "삭제",
      loading: "불러오는 중",
    },
  },
}

export function ButtonRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row" dir={dir}>
      <Button variant="outline">{t.button}</Button>
      <Button variant="destructive">{t.delete}</Button>
      <Button variant="outline">
        {t.submit}{" "}
        <ArrowRightIcon className="rtl:rotate-180" data-icon="inline-end" />
      </Button>
      <Button variant="outline" size="icon" aria-label="추가">
        <PlusIcon />
      </Button>
      <Button variant="secondary" disabled>
        <Spinner data-icon="inline-start" /> {t.loading}
      </Button>
    </div>
  )
}
