import { Button } from "@/styles/base-nova/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/styles/base-nova/ui/sheet"

export default function SheetNoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        시트 열기
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>닫기 버튼 없음</SheetTitle>
          <SheetDescription>
            이 시트에는 오른쪽 위 닫기 버튼이 없습니다. 바깥을 누르면 닫힙니다.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
