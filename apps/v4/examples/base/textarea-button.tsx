import { Button } from "@/styles/base-nova/ui/button"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="메시지를 입력하세요." />
      <Button>메시지 보내기</Button>
    </div>
  )
}
