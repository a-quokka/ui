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

export function QuestionnaireConditional() {
  const [runtime, setRuntime] = React.useState("local")
  const items = React.useMemo(
    () => [
      { name: "runtime", required: true },
      {
        disabled: runtime !== "cloud",
        name: "environment",
        required: true,
      },
      { name: "approval", required: true },
    ],
    [runtime]
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Execution plan saved", {
      description: `Runtime: ${formData.get("runtime") ?? "None"} · Environment: ${formData.get("environment") ?? "Not applicable"} · Approval: ${formData.get("approval") ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="runtime"
      items={items}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="runtime" required>
        <QuestionnaireTitle>에이전트를 어디서 돌릴까요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          클라우드에서 돌리면 환경을 묻는 단계가 하나 늘어납니다.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice
            checked={runtime === "local"}
            value="local"
            onChange={() => setRuntime("local")}
          >
            로컬 작업 공간
          </QuestionnaireChoice>
          <QuestionnaireChoice
            checked={runtime === "cloud"}
            value="cloud"
            onChange={() => setRuntime("cloud")}
          >
            클라우드 작업 공간
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem
        disabled={runtime !== "cloud"}
        name="environment"
        required
      >
        <QuestionnaireTitle>어떤 클라우드 환경을 쓸까요?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="preview">미리보기</QuestionnaireChoice>
          <QuestionnaireChoice value="staging">스테이징</QuestionnaireChoice>
          <QuestionnaireChoice value="isolated">
            격리된 샌드박스
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="approval" required>
        <QuestionnaireTitle>
          에이전트가 언제 승인을 받을까요?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="writes">
            파일을 쓰기 전
          </QuestionnaireChoice>
          <QuestionnaireChoice value="commands">
            명령을 실행하기 전
          </QuestionnaireChoice>
          <QuestionnaireChoice value="sensitive">
            민감한 동작에만
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext>다음</QuestionnaireNext>
        <QuestionnaireSubmit>실행 계획 저장</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
