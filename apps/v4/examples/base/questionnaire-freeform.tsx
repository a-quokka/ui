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
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  {
    choices: [
      { value: "incremental" },
      { value: "module" },
      { value: "rewrite" },
    ],
    name: "approach",
    required: true,
  },
] as const

export function QuestionnaireFreeform() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const approach = new FormData(event.currentTarget).get("approach")

    toast("방식을 골랐습니다", {
      description: `Approach: ${approach ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      items={items}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireItem name="approach" required>
        <QuestionnaireTitle>
          이 리팩터링을 어떻게 진행할까요?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          방식을 고르거나 더 구체적인 지시를 적어 주세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="incremental">
            가장 작고 안전한 변경만 한다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="module">
            모듈을 하나씩 리팩터링한다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="rewrite">
            구현을 통째로 갈아엎는다
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="다른 리팩터링 방식"
            placeholder="다른 방식을 적어 주세요…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnaireSubmit>이 방식으로 진행</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
