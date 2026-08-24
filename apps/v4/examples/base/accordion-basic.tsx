import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui/accordion"

const items = [
  {
    value: "item-1",
    trigger: "비밀번호를 어떻게 다시 설정하나요?",
    content:
      "로그인 화면에서 '비밀번호 찾기'를 누르고 이메일 주소를 입력하면 재설정 링크를 보내 드립니다. 링크는 24시간 뒤에 만료됩니다.",
  },
  {
    value: "item-2",
    trigger: "구독 요금제를 바꿀 수 있나요?",
    content:
      "네, 계정 설정에서 언제든 요금제를 올리거나 내릴 수 있습니다. 바뀐 내용은 다음 결제 주기부터 적용됩니다.",
  },
  {
    value: "item-3",
    trigger: "어떤 결제 수단을 쓸 수 있나요?",
    content:
      "주요 신용카드와 PayPal, 계좌 이체를 지원합니다. 모든 결제는 결제 파트너를 통해 안전하게 처리됩니다.",
  },
]

export function AccordionBasic() {
  return (
    <Accordion defaultValue={["item-1"]} className="max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
