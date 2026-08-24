import { Badge } from "@/styles/base-nova/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>배지</Badge>
      <Badge variant="secondary">보조</Badge>
      <Badge variant="destructive">경고</Badge>
      <Badge variant="outline">외곽선</Badge>
    </div>
  )
}
