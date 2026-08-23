import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["shipping"]} className="max-w-lg">
      <AccordionItem value="shipping">
        <AccordionTrigger>배송 방법은 어떤 게 있나요?</AccordionTrigger>
        <AccordionContent>
          일반(5~7일), 빠른 배송(2~3일), 익일 배송을 제공합니다. 해외 주문은
          배송비가 무료입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>반품 정책이 어떻게 되나요?</AccordionTrigger>
        <AccordionContent>
          30일 안에 반품할 수 있습니다. 사용하지 않은 상품이어야 하고 원래 포장
          그대로여야 합니다. 환불은 영업일 기준 5~7일 안에 처리됩니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>고객 지원은 어떻게 받나요?</AccordionTrigger>
        <AccordionContent>
          이메일, 실시간 채팅, 전화로 문의하세요. 영업일 기준 24시간 안에
          답변드립니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
