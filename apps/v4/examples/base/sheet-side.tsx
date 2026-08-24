import { Button } from "@/styles/base-nova/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/styles/base-nova/ui/sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export default function SheetSide() {
  return (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button variant="outline" className="capitalize" />}
          >
            {side}
          </SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>프로필 수정</SheetTitle>
              <SheetDescription>
                여기서 프로필을 고칠 수 있습니다. 다 되면 저장을 누르세요.
              </SheetDescription>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-2 leading-relaxed">
                  다람쥐 헌 쳇바퀴에 타고파. 이 문장은 글자 크기와 행간을 눈으로
                  가늠하려고 넣어 둔 예시 문장입니다. 특별한 뜻은 없고, 한글이
                  실제로 어떻게 흐르는지 보기 위한 자리 채움 글입니다. 문단이
                  길어졌을 때 줄이 어떻게 나뉘고 여백이 어떻게 잡히는지, 굵기와
                  자간이 화면에서 어떻게 읽히는지 확인하는 데 씁니다. 실제
                  문안이 들어가면 이 자리는 그대로 대체됩니다.
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type="submit">저장</Button>
              <SheetClose render={<Button variant="outline" />}>
                취소
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
