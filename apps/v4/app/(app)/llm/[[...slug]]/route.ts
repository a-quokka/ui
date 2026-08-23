import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { processMdxForLLMs } from "@/lib/llm"
import { source } from "@/lib/source"
import { type Style } from "@/registry/_legacy-styles"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = true

function getStyleFromSlug(slug: string[] | undefined, fallbackStyle: string) {
  // 이 포크는 base 한 벌만 담는다. /docs/components/base 만 인식한다.
  if (slug && slug[0] === "components" && slug[1] === "base") {
    return "base-nova"
  }
  return fallbackStyle
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params

  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  // Default to the base style. Legacy content pins new-york-v4 per tag.
  const effectiveStyle = getStyleFromSlug(slug, "base-nova")

  const processedContent = processMdxForLLMs(
    await page.data.getText("raw"),
    effectiveStyle as Style["name"]
  )

  return new NextResponse(processedContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  })
}

export function generateStaticParams() {
  return []
}
