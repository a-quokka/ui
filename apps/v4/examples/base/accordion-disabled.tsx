import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"

export default function AccordionDisabled() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>계정 이용 내역을 볼 수 있나요?</AccordionTrigger>
        <AccordionContent>
          네. 대시보드의 계정 이용 내역에서 모든 결제, 요금제 변경, 문의 내역을
          볼 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>프리미엄 기능 안내</AccordionTrigger>
        <AccordionContent>
          프리미엄 기능에 대한 안내입니다. 요금제를 올리면 볼 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>이메일 주소는 어떻게 바꾸나요?</AccordionTrigger>
        <AccordionContent>
          계정 설정에서 이메일 주소를 바꿀 수 있습니다. 새 주소로 확인 메일이
          발송됩니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
