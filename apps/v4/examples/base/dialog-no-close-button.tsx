import { Button } from "@/styles/base-nova/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/styles/base-nova/ui/dialog"

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        닫기 버튼 없음
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>닫기 버튼 없음</DialogTitle>
          <DialogDescription>
            이 다이얼로그에는 오른쪽 위 닫기 버튼이 없습니다.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
