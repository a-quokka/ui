import { Separator } from "@/styles/base-nova/ui/separator"

export function SeparatorMenu() {
  return (
    <div className="flex items-center gap-2 text-sm md:gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium">설정</span>
        <span className="text-xs text-muted-foreground">환경설정 관리</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">계정</span>
        <span className="text-xs text-muted-foreground">프로필 · 보안</span>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="hidden flex-col gap-1 md:flex">
        <span className="font-medium">도움말</span>
        <span className="text-xs text-muted-foreground">지원 · 문서</span>
      </div>
    </div>
  )
}
