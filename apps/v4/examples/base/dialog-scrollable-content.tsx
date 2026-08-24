import { Button } from "@/styles/base-nova/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/styles/base-nova/ui/dialog"

export function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        스크롤되는 내용
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>스크롤되는 내용</DialogTitle>
          <DialogDescription>
            내용이 스크롤되는 다이얼로그입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              다람쥐 헌 쳇바퀴에 타고파. 이 문장은 글자 크기와 행간을 눈으로
              가늠하려고 넣어 둔 예시 문장입니다. 특별한 뜻은 없고, 한글이
              실제로 어떻게 흐르는지 보기 위한 자리 채움 글입니다. 문단이
              길어졌을 때 줄이 어떻게 나뉘고 여백이 어떻게 잡히는지, 굵기와
              자간이 화면에서 어떻게 읽히는지 확인하는 데 씁니다. 실제 문안이
              들어가면 이 자리는 그대로 대체됩니다.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
