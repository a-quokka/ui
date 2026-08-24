import { Separator } from "@/styles/base-nova/ui/separator"

export function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>블로그</div>
      <Separator orientation="vertical" />
      <div>문서</div>
      <Separator orientation="vertical" />
      <div>소스</div>
    </div>
  )
}
