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
  { name: "task", required: true },
  { name: "review", required: true },
  { name: "delivery", required: true },
] as const

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none"

export function QuestionnaireAnimated() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("에이전트 흐름을 저장했습니다", {
      description: `Task: ${formData.get("task") ?? "None"} · Review: ${formData.get("review") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="task"
      items={items}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem className={itemClassName} name="task" required>
        <QuestionnaireTitle>에이전트가 무엇을 할까요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          이번에 맡길 작업을 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="implement">
            요청한 변경을 구현한다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="debug">
            지금 동작을 디버깅한다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="review">
            구현을 검토한다
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem className={itemClassName} name="review" required>
        <QuestionnaireTitle>작업을 어떻게 검토할까요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          검증 수준을 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="targeted">
            필요한 검사만
          </QuestionnaireChoice>
          <QuestionnaireChoice value="complete">
            테스트 전체
          </QuestionnaireChoice>
          <QuestionnaireChoice value="manual">
            테스트와 수동 QA
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem className={itemClassName} name="delivery" required>
        <QuestionnaireTitle>결과를 어떻게 전달할까요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          최종 인계 형식을 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="summary">간결한 요약</QuestionnaireChoice>
          <QuestionnaireChoice value="diff">
            요약과 바뀐 파일
          </QuestionnaireChoice>
          <QuestionnaireChoice value="handoff">
            상세 검토 인계
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
  )
}
