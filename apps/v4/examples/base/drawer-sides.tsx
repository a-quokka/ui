import { Button } from "@/styles/base-rhea/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/styles/base-rhea/ui/drawer"

export function DrawerWithSides() {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button variant="secondary" />}>
        왼쪽 Drawer 열기
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>목표 조정</DrawerTitle>
          <DrawerDescription>하루 활동 목표를 정하세요.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>닫기</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
