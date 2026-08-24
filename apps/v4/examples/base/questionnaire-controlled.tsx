"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  { name: "scope", required: true },
  { name: "checks", required: true },
  { name: "output", required: true },
] as const

const itemLabels: Record<string, string> = {
  scope: "범위 바꾸기",
  checks: "Verification",
  output: "Final output",
}

export function QuestionnaireControlled() {
  const [item, setItem] = React.useState("scope")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("에이전트 흐름 설정을 저장했습니다", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("checks") ?? "None"} · Output: ${formData.get("output") ?? "None"}`,
    })
  }

  return (
    <div className="relative mx-auto flex h-full w-full max-w-md flex-col">
      <p
        className="absolute end-0 top-0 text-sm text-muted-foreground"
        role="status"
      >
        현재 지점: {itemLabels[item]}
      </p>

      <Questionnaire
        className="mt-auto"
        item={item}
        items={items}
        onItemChange={setItem}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="scope" required>
          <QuestionnaireTitle>
            에이전트가 무엇을 바꿔도 될까요?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Questionnaire 가 이동하는 동안 현재 지점은 바깥에서 보관합니다.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="component">
              대상 컴포넌트만
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              컴포넌트와 관련 테스트
            </QuestionnaireChoice>
            <QuestionnaireChoice value="feature">
              기능 영역 전체
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="checks" required>
          <QuestionnaireTitle>어느 검증 수준을 쓸까요?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">
              필요한 테스트만
            </QuestionnaireChoice>
            <QuestionnaireChoice value="package">
              패키지 테스트와 타입 검사
            </QuestionnaireChoice>
            <QuestionnaireChoice value="full">
              작업 공간 전체 검증
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="output" required>
          <QuestionnaireTitle>끝나면 무엇을 돌려줄까요?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary">
              간결한 요약
            </QuestionnaireChoice>
            <QuestionnaireChoice value="diff">
              요약과 바뀐 파일
            </QuestionnaireChoice>
            <QuestionnaireChoice value="handoff">
              상세 구현 인계
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>다음</QuestionnaireNext>
          <QuestionnaireSubmit>워크플로 저장</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
