"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import type { IconLibraryName } from "shadcn/icons"

/**
 * 이 포크는 (create) 디자인 시스템 편집기를 걷어냈다. 하지만 registry 블록
 * 소스가 `@/app/(create)/lib/search-params` 경로를 그대로 담아 배포되므로
 * (레지스트리 페이로드에 원문이 실린다) 훅 자체는 남아 있어야 한다.
 *
 * 블록들이 실제로 읽는 건 `style`·`font`·`fontHeading`·`iconLibrary` 네 개뿐이라
 * 쿼리 스트링에서 그것만 읽는 최소 구현으로 대체했다. 편집기가 없으니 값을
 * 바꿀 일도 없어 setter 는 no-op 이다.
 */
export type DesignSystemParams = {
  style: string
  font: string
  fontHeading: string
  iconLibrary: IconLibraryName
}

const DEFAULTS: DesignSystemParams = {
  style: "nova",
  font: "geist",
  fontHeading: "inherit",
  iconLibrary: "lucide",
}

const ICON_LIBRARIES: IconLibraryName[] = [
  "lucide",
  "tabler",
  "hugeicons",
  "phosphor",
  "remixicon",
]

function isIconLibrary(value: string | null): value is IconLibraryName {
  return value !== null && ICON_LIBRARIES.includes(value as IconLibraryName)
}

export function useDesignSystemSearchParams() {
  const searchParams = useSearchParams()

  const params = React.useMemo<DesignSystemParams>(() => {
    const iconLibrary = searchParams.get("iconLibrary")

    return {
      style: searchParams.get("style") ?? DEFAULTS.style,
      font: searchParams.get("font") ?? DEFAULTS.font,
      fontHeading: searchParams.get("fontHeading") ?? DEFAULTS.fontHeading,
      iconLibrary: isIconLibrary(iconLibrary)
        ? iconLibrary
        : DEFAULTS.iconLibrary,
    }
  }, [searchParams])

  const setParams = React.useCallback(() => {
    // 편집기가 없으므로 값을 바꾸지 않는다.
  }, [])

  return [params, setParams] as const
}
