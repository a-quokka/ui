import { Separator } from "@/styles/base-nova/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">디자인 시스템의 토대</div>
      </div>
      <Separator />
      <div>
        원하는 대로 고치고 확장해 쓸 수 있는, 잘 다듬어진 컴포넌트 모음입니다.
      </div>
    </div>
  )
}
