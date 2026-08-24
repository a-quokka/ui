import { Badge } from "@/styles/base-nova/ui/badge"

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>기본</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="destructive">경고</Badge>
      <Badge variant="outline">외곽선</Badge>
      <Badge variant="ghost">고스트</Badge>
    </div>
  )
}
