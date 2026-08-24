import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"

const items = [
  {
    value: "plans",
    trigger: "어떤 구독 요금제가 있나요?",
    content:
      "요금제는 세 가지입니다. Starter(월 9달러), Professional(월 29달러), Enterprise(월 99달러). 위 단계로 갈수록 저장 용량이 늘고 API 접근, 우선 지원, 팀 협업 기능이 더해집니다.",
  },
  {
    value: "billing",
    trigger: "결제는 어떻게 되나요?",
    content:
      "결제는 각 주기가 시작될 때 자동으로 이뤄집니다. 주요 신용카드와 PayPal 을 지원하고 엔터프라이즈 고객은 ACH 이체도 쓸 수 있습니다. 결제할 때마다 청구서를 이메일로 보내 드립니다.",
  },
  {
    value: "cancel",
    trigger: "구독은 어떻게 해지하나요?",
    content:
      "계정 설정에서 언제든 해지할 수 있습니다. 해지 수수료나 위약금은 없습니다. 현재 결제 주기가 끝날 때까지는 그대로 이용할 수 있습니다.",
  },
]

export default function AccordionCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>구독 · 결제</CardTitle>
        <CardDescription>
          계정·요금제·결제·해지에 대해 자주 묻는 질문입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["plans"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
