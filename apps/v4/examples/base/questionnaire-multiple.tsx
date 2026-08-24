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
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  {
    choices: [
      { value: "source" },
      { value: "tests" },
      { value: "docs" },
      { value: "history" },
    ],
    name: "context",
    required: true,
  },
] as const

export function QuestionnaireMultiple() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const context = new FormData(event.currentTarget).getAll("context")

    toast("맥락을 골랐습니다", {
      description: `Context: ${context.join(", ") || "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      items={items}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem name="context" multiple required>
        <QuestionnaireTitle>
          에이전트가 무엇을 살펴봐야 할까요?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          구현에 영향을 줄 만한 자료를 모두 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="source">
            관련 소스 파일
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tests">기존 테스트</QuestionnaireChoice>
          <QuestionnaireChoice value="docs">구조 문서</QuestionnaireChoice>
          <QuestionnaireChoice value="history">
            최근 커밋 기록
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnaireSubmit>맥락 공유</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
