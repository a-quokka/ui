"use client"

import * as React from "react"
import Image from "next/image"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { AspectRatio } from "@/styles/base-nova/ui-rtl/aspect-ratio"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      caption: "멋진 풍경",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      caption: "멋진 풍경",
    },
  },
}

export function AspectRatioRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <figure className="w-full max-w-sm" dir={dir}>
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
        <Image
          src="https://avatar.vercel.sh/shadcn1"
          alt="사진"
          fill
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        {t.caption}
      </figcaption>
    </figure>
  )
}
