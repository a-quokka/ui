"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/styles/base-nova/ui-rtl/accordion"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      question1: "How do I reset my password?",
      answer1:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password.",
      question2: "Can I change my subscription plan?",
      answer2:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
      question3: "What payment methods do you accept?",
      answer3:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      question1: "비밀번호를 어떻게 다시 설정하나요?",
      answer1:
        "로그인 화면에서 '비밀번호 찾기'를 누르고 이메일 주소를 입력하면 재설정 링크를 보내 드립니다.",
      question2: "구독 요금제를 바꿀 수 있나요?",
      answer2:
        "네, 계정 설정에서 언제든 요금제를 올리거나 내릴 수 있습니다. 바뀐 내용은 다음 결제 주기부터 적용됩니다.",
      question3: "어떤 결제 수단을 쓸 수 있나요?",
      answer3:
        "주요 신용카드와 PayPal, 계좌 이체를 지원합니다. 모든 결제는 결제 파트너를 통해 안전하게 처리됩니다.",
    },
  },
}

const items = [
  {
    value: "item-1",
    questionKey: "question1" as const,
    answerKey: "answer1" as const,
  },
  {
    value: "item-2",
    questionKey: "question2" as const,
    answerKey: "answer2" as const,
  },
  {
    value: "item-3",
    questionKey: "question3" as const,
    answerKey: "answer3" as const,
  },
] as const

export function AccordionRtl() {
  const { t } = useTranslation(translations, "ko")

  return (
    <Accordion defaultValue={["item-1"]} className="max-w-md">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{t[item.questionKey]}</AccordionTrigger>
          <AccordionContent>{t[item.answerKey]}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
