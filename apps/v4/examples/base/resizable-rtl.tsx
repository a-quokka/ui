"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/styles/base-nova/ui-rtl/resizable"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      one: "One",
      two: "Two",
      three: "Three",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      one: "하나",
      two: "둘",
      three: "셋",
    },
  },
}

export function ResizableRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-sm rounded-lg border"
      dir={dir}
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">{t.one}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical" dir={dir}>
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">{t.two}</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">{t.three}</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
