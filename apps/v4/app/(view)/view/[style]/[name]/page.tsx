/* eslint-disable react-hooks/static-components */
import * as React from "react"
import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/lib/config"
import {
  getDemoItem,
  getRegistryComponent,
  getRegistryItem,
} from "@/lib/registry"
import { absoluteUrl } from "@/lib/utils"
import { getStyle, type Style } from "@/registry/_legacy-styles"

import "@/app/legacy-themes.css"

import { ComponentPreview } from "./component-preview"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = true

const getCachedRegistryItem = React.cache(
  async (name: string, styleName: Style["name"]) => {
    // Try registry item first, then fallback to demo item (for examples).
    const item = await getRegistryItem(name, styleName)
    if (item) {
      return item
    }
    return await getDemoItem(name, styleName)
  }
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    style: string
    name: string
  }>
}): Promise<Metadata> {
  const { style: styleName, name } = await params
  const style = getStyle(styleName)

  if (!style) {
    return {}
  }

  const item = await getCachedRegistryItem(name, style.name)

  if (!item) {
    return {}
  }

  const title = item.name
  const description = item.description

  return {
    title: item.name,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/view/${style.name}/${item.name}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}

export async function generateStaticParams() {
  // 이 포크의 범위는 menu / sections / components 다.
  // 이 라우트는 문서에 박힌 미리보기 iframe 이 쓰므로 남기되,
  // 사전 생성은 끊고 요청 시 생성으로 돌린다 (빌드 시간·산출물 절감).
  return []
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{
    style: string
    name: string
  }>
}) {
  const { style: styleName, name } = await params
  const style = getStyle(styleName)

  if (!style) {
    return notFound()
  }

  const item = await getCachedRegistryItem(name, style.name)
  const Component = getRegistryComponent(name, style.name)

  if (!item || !Component) {
    return notFound()
  }

  return (
    <ComponentPreview>
      <Component />
    </ComponentPreview>
  )
}
