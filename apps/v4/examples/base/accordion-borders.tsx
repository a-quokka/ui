import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"

const items = [
  {
    value: "billing",
    trigger: "결제는 어떻게 되나요?",
    content:
      "월간 요금제와 연간 요금제가 있습니다. 결제는 각 주기가 시작될 때 이뤄지고 언제든 해지할 수 있습니다. 모든 요금제에 자동 백업, 24시간 지원, 팀원 수 제한 없음이 포함됩니다.",
  },
  {
    value: "security",
    trigger: "데이터는 안전한가요?",
    content:
      "네. 종단 간 암호화를 쓰고 SOC 2 Type II 를 준수하며 외부 보안 감사를 정기적으로 받습니다. 저장된 데이터와 전송 중인 데이터 모두 업계 표준 프로토콜로 암호화합니다.",
  },
  {
    value: "integration",
    trigger: "어떤 연동을 지원하나요?",
    content:
      "Slack, Zapier, Salesforce, HubSpot 을 비롯해 500개가 넘는 도구와 연동합니다. REST API 와 웹훅으로 직접 연동을 만들 수도 있습니다.",
  },
]

export default function AccordionBorders() {
  return (
    <Accordion
      className="max-w-lg rounded-lg border"
      defaultValue={["billing"]}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border-b px-4 last:border-b-0"
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
