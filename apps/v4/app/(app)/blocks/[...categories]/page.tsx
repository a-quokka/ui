import { getAllBlockIds } from "@/lib/blocks"
import { registryCategories } from "@/lib/categories"
import { BlockDisplay } from "@/components/block-display"
import { getActiveStyle } from "@/registry/_legacy-styles"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  // 이 포크의 범위는 menu / sections / components 다.
  // 이 라우트는 문서에 박힌 미리보기 iframe 이 쓰므로 남기되,
  // 사전 생성은 끊고 요청 시 생성으로 돌린다 (빌드 시간·산출물 절감).
  return []

  return registryCategories.map((category) => ({
    categories: [category.slug],
  }))
}

export default async function BlocksPage({
  params,
}: {
  params: Promise<{ categories?: string[] }>
}) {
  const [{ categories = [] }, activeStyle] = await Promise.all([
    params,
    getActiveStyle(),
  ])
  const blocks = await getAllBlockIds(["registry:block"], categories)

  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {blocks.map((name) => (
        <BlockDisplay name={name} key={name} styleName={activeStyle.name} />
      ))}
    </div>
  )
}
