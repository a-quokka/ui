import { Separator } from "@/styles/base-nova/ui/separator"

export function SeparatorList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>항목 1</dt>
        <dd className="text-muted-foreground">값 1</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>항목 2</dt>
        <dd className="text-muted-foreground">값 2</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>항목 3</dt>
        <dd className="text-muted-foreground">값 3</dd>
      </dl>
    </div>
  )
}
