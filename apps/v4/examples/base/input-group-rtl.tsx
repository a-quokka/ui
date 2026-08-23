"use client"

import * as React from "react"
import { Search } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-nova/ui-rtl/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/styles/base-nova/ui-rtl/input-group"
import { Spinner } from "@/styles/base-nova/ui-rtl/spinner"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Search...",
      results: "12 results",
      searching: "Searching...",
      saving: "Saving...",
      savingChanges: "Saving changes...",
      textareaLabel: "Textarea",
      textareaPlaceholder: "Write a comment...",
      characterCount: "0/280",
      post: "Post",
      textareaDescription: "Footer positioned below the textarea.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      placeholder: "검색...",
      results: "12개 결과",
      searching: "검색 중...",
      saving: "저장 중...",
      savingChanges: "변경 사항 저장 중...",
      textareaLabel: "Textarea",
      textareaPlaceholder: "댓글을 남겨 보세요...",
      characterCount: "0/280",
      post: "올리기",
      textareaDescription: "textarea 아래에 놓인 푸터입니다.",
    },
  },
}

export function InputGroupRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder={t.placeholder} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{t.results}</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder={t.searching} />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder={t.savingChanges} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>{t.saving}</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="rtl-textarea">{t.textareaLabel}</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="rtl-textarea"
              placeholder={t.textareaPlaceholder}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>{t.characterCount}</InputGroupText>
              <InputGroupButton variant="default" size="sm" className="ms-auto">
                {t.post}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>{t.textareaDescription}</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
