"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const CDN = "https://cdn.aistudio.dropshot.io/public/icons"

/**
 * 브랜드 자산은 아이콘과 달리 고유한 색을 그대로 지켜야 한다.
 * 그래서 아이콘처럼 인라인해서 `currentColor` 로 바꾸지 않고 CDN 원본을 그대로 띄운다.
 * 워드마크 하나가 100KB 라 인라인할 것도 아니다.
 */
export function BrandAsset({
  name,
  surface = "dark",
  size,
  ratio,
  note,
}: {
  name: string
  /** 자산이 흰색이면 `dark`, 검정이면 `light` 를 깔아야 보인다. */
  surface?: "dark" | "light" | "grid"
  /** 원본 크기 표기. `570 × 110` 처럼. */
  size?: string
  /** 미리보기 영역의 가로세로 비율. 배경·패턴처럼 늘려 쓰는 자산에 쓴다. */
  ratio?: string
  note?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const url = `${CDN}/${name}.svg`

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 클립보드를 막아 둔 환경에서는 조용히 넘어간다.
    }
  }

  return (
    <div className="not-prose flex flex-col overflow-hidden rounded-lg border">
      <div
        className={cn(
          "flex items-center justify-center p-8",
          surface === "dark" && "bg-[#15191e]",
          surface === "light" && "bg-white",
          surface === "grid" &&
            "bg-[repeating-conic-gradient(#2a2f36_0%_25%,#1f242a_0%_50%)] bg-[length:16px_16px]"
        )}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={name.replace(/^ic_/, "")}
          className="max-h-24 w-auto max-w-full"
        />
      </div>
      <div className="flex items-center gap-2 border-t px-3 py-2">
        <code className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          {name}.svg
        </code>
        {size && (
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {size}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          title="CDN 주소 복사"
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? (
            <IconCheck className="size-3.5" />
          ) : (
            <IconCopy className="size-3.5" />
          )}
          <span className="sr-only">CDN 주소 복사</span>
        </button>
      </div>
      {note && (
        <p className="border-t px-3 py-2 text-xs text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  )
}

export function BrandAssetGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{children}</div>
  )
}
