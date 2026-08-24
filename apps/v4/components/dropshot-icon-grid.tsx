"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { dropshotIcons } from "@/components/dropshot-icons"
import { Input } from "@/registry/bases/base/ui/input"

/** 제품 코드가 쓰는 이름은 `ic_` 를 뗀 쪽이다. `getIconAttributes({ iconName })` */
function toIconName(fileName: string) {
  return fileName.replace(/^ic_/, "")
}

export function DropshotIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const icon = dropshotIcons[name] ?? dropshotIcons[`ic_${name}`]

  if (!icon) {
    return null
  }

  return (
    <svg
      viewBox={icon.viewBox}
      className={cn("size-6", className)}
      aria-hidden="true"
      data-icon={name}
    >
      {icon.body}
    </svg>
  )
}

export function DropshotIconGrid({ grid }: { grid?: "24" | "other" }) {
  const [query, setQuery] = React.useState("")
  const [copied, setCopied] = React.useState<string | null>(null)

  const names = React.useMemo(() => {
    const all = Object.keys(dropshotIcons).filter((name) =>
      grid === "other"
        ? dropshotIcons[name].viewBox !== "0 0 24 24"
        : dropshotIcons[name].viewBox === "0 0 24 24"
    )
    const q = query.trim().toLowerCase()
    return q ? all.filter((name) => name.toLowerCase().includes(q)) : all
  }, [grid, query])

  async function copy(name: string) {
    try {
      await navigator.clipboard.writeText(toIconName(name))
      setCopied(name)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // 클립보드를 막아 둔 환경에서는 조용히 넘어간다.
    }
  }

  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="아이콘 이름으로 거르기"
          className="max-w-64"
          aria-label="아이콘 이름으로 거르기"
        />
        <span className="text-xs text-muted-foreground tabular-nums">
          {names.length}개
        </span>
      </div>
      {names.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {names.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              title={`${toIconName(name)} 복사`}
              className="group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors hover:bg-accent"
            >
              <DropshotIcon name={name} className="shrink-0 text-foreground" />
              <code className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {toIconName(name)}
              </code>
              {copied === name ? (
                <IconCheck className="size-3.5 shrink-0 text-muted-foreground" />
              ) : (
                <IconCopy className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      )}
      {names.length === 0 && (
        <p className="text-sm text-muted-foreground">
          `{query}` 와 맞는 아이콘이 없습니다.
        </p>
      )}
    </div>
  )
}
