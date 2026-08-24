"use client"

import * as React from "react"
import type { QuestionnaireItemStatus } from "@shadcn/react/questionnaire"
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
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  { name: "task", required: true },
  { name: "constraints" },
  { name: "review", required: true },
] as const

export function QuestionnaireSkipExample() {
  const [constraintStatus, setConstraintStatus] =
    React.useState<QuestionnaireItemStatus>("unanswered")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      task: formData.get("task"),
      constraints: formData.get("constraints"),
      constraintStatus,
      review: formData.get("review"),
    }

    toast("Agent brief submitted", {
      description: `Task: ${answers.task ?? "None"} · Constraints: ${answers.constraintStatus === "skipped" ? "Skipped" : (answers.constraints ?? "None")} · Review: ${answers.review ?? "None"}`,
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

      <QuestionnaireItem name="task" required>
        <QuestionnaireTitle>어떤 종류의 변경인가요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          작업을 가장 잘 설명하는 갈래를 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="feature">새 기능</QuestionnaireChoice>
          <QuestionnaireChoice value="fix">버그 수정</QuestionnaireChoice>
          <QuestionnaireChoice value="refactor">리팩터링</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem
        name="constraints"
        onStatusChange={setConstraintStatus}
      >
        <QuestionnaireTitle>구현에 제약이 있나요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          필요하면 답하고, 아니면 이 질문은 건너뛰세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="no-dependencies">
            의존성을 추가하지 않는다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="no-migrations">
            데이터베이스는 건드리지 않는다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="preserve-api">
            공개 API 를 유지한다
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="다른 구현 제약"
            placeholder="다른 제약을 적어 주세요…"
          />
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="review" required>
        <QuestionnaireTitle>작업을 어떻게 검토할까요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          인계 전에 끝내야 할 검사를 고르세요.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests">
            테스트 전체를 돌린다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="diff">
            최종 diff 를 검토한다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            테스트와 diff 검토
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext>다음</QuestionnaireNext>
        <QuestionnaireSubmit>요청 보내기</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
