"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/styles/base-nova/ui-rtl/pagination"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      previous: "Previous",
      next: "Next",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      previous: "이전",
      next: "다음",
    },
  },
}

export function PaginationRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")

  const formatNumber = (num: number): string => num.toString()

  return (
    <Pagination dir={dir}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text={t.previous} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(1)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {formatNumber(2)}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{formatNumber(3)}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text={t.next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
