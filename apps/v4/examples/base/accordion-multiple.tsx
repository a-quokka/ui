import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"

const items = [
  {
    value: "notifications",
    trigger: "알림 설정",
    content:
      "알림을 어떻게 받을지 정합니다. 업데이트는 이메일로, 모바일에는 푸시로 받을 수 있습니다.",
  },
  {
    value: "privacy",
    trigger: "개인정보 · 보안",
    content:
      "개인정보와 보안 설정을 관리합니다. 2단계 인증을 켜고, 연결된 기기를 관리하고, 활성 세션을 확인하고, 데이터 공유 설정을 조정할 수 있습니다. 데이터를 내려받거나 계정을 삭제할 수도 있습니다.",
  },
  {
    value: "billing",
    trigger: "결제 · 구독",
    content:
      "현재 요금제와 결제 내역, 다가올 청구서를 봅니다. 결제 수단을 바꾸거나 요금제를 변경하거나 해지할 수 있습니다.",
  },
]

export function AccordionMultiple() {
  return (
    <Accordion multiple className="max-w-lg" defaultValue={["notifications"]}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
