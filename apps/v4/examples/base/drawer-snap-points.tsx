"use client"

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

const SNAP_POINTS = ["31rem", 1]

export function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        스냅 Drawer 열기
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>스냅 포인트</DrawerTitle>
          <DrawerDescription>
            drawer 를 끌면 살짝 보이는 상태와 거의 전체 높이 사이를 오갑니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>닫기</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
