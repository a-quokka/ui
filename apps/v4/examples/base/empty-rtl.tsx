"use client"

import * as React from "react"
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-nova/ui-rtl/empty"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "아직 프로젝트가 없습니다",
      description:
        "만든 프로젝트가 아직 없습니다. 첫 프로젝트를 만들어 보세요.",
      createProject: "Create Project",
      importProject: "Import Project",
      learnMore: "Learn More",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      title: "아직 프로젝트가 없습니다",
      description:
        "만든 프로젝트가 아직 없습니다. 첫 프로젝트를 만들어 보세요.",
      createProject: "프로젝트 만들기",
      importProject: "프로젝트 가져오기",
      learnMore: "자세히 보기",
    },
  },
}

export function EmptyRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Empty dir={dir}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>{t.title}</EmptyTitle>
        <EmptyDescription>{t.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>{t.createProject}</Button>
        <Button variant="outline">{t.importProject}</Button>
      </EmptyContent>
      <Button
        variant="link"
        render={<a href="#" />}
        className="text-muted-foreground"
        size="sm"
        nativeButton={false}
      >
        {t.learnMore}{" "}
        <ArrowUpRightIcon className="rtl:rotate-270" data-icon="inline-end" />
      </Button>
    </Empty>
  )
}
