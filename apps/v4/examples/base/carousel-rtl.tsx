"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Card, CardContent } from "@/styles/base-nova/ui-rtl/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/styles/base-nova/ui-rtl/carousel"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ko: {
    dir: "ltr",
    values: {},
  },
}

export function CarouselRtl() {
  const { dir, language } = useTranslation(translations, "ko")

  const formatNumber = (num: number): string => num.toString()

  return (
    <Carousel
      dir={dir}
      className="w-full max-w-[12rem] sm:max-w-xs"
      opts={{
        direction: dir,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">
                    {formatNumber(index + 1)}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
