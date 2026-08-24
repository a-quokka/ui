"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
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
  { name: "strategy", required: true },
  { name: "tests", required: true },
  { name: "delivery", required: true },
] as const

export function QuestionnaireProgressExample() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Pull request plan ready", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Commits: ${formData.get("strategy") ?? "None"} · Tests: ${formData.get("tests") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="scope"
      items={items}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress
        className="w-full"
        render={(props, state) => (
          <div {...props}>
            <div className="mb-2 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: state.total }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < state.current
                      ? "h-1.5 flex-1 rounded-full bg-primary"
                      : "h-1.5 flex-1 rounded-full bg-muted"
                  }
                />
              ))}
            </div>
            <span>
              Checkpoint {state.current} of {state.total}
            </span>
          </div>
        )}
      />

      <QuestionnaireItem name="scope" required>
        <QuestionnaireTitle>변경 규모가 어느 정도인가요?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="small">작은 패치</QuestionnaireChoice>
          <QuestionnaireChoice value="medium">
            기능 단위 변경
          </QuestionnaireChoice>
          <QuestionnaireChoice value="large">
            여러 패키지에 걸친 변경
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="strategy" required>
        <QuestionnaireTitle>커밋을 어떻게 나눌까요?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="single">커밋 하나</QuestionnaireChoice>
          <QuestionnaireChoice value="logical">
            의미 단위 커밋
          </QuestionnaireChoice>
          <QuestionnaireChoice value="squash">
            검토 전에 하나로 합치기
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="tests" required>
        <QuestionnaireTitle>어떤 테스트를 돌릴까요?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="targeted">
            필요한 테스트만
          </QuestionnaireChoice>
          <QuestionnaireChoice value="package">
            패키지 테스트 묶음
          </QuestionnaireChoice>
          <QuestionnaireChoice value="workspace">
            작업 공간 전체
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="delivery" required>
        <QuestionnaireTitle>작업 결과를 어떻게 전달할까요?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="patch">패치만</QuestionnaireChoice>
          <QuestionnaireChoice value="commit">
            로컬에만 커밋
          </QuestionnaireChoice>
          <QuestionnaireChoice value="branch">
            검토용 브랜치 푸시
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext>다음</QuestionnaireNext>
        <QuestionnaireSubmit>계획 마무리</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
