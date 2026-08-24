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
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  { name: "permission", required: true },
  { name: "verification", required: true },
] as const

type ItemName = "permission" | "verification"

export function QuestionnaireNavigationState() {
  const [item, setItem] = React.useState<ItemName>("permission")
  const [statuses, setStatuses] = React.useState<
    Record<ItemName, QuestionnaireItemStatus>
  >({
    permission: "unanswered",
    verification: "unanswered",
  })
  const unanswered = statuses[item] === "unanswered"

  function setStatus(name: ItemName, status: QuestionnaireItemStatus) {
    setStatuses((current) => ({ ...current, [name]: status }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("권한을 저장했습니다", {
      description: `Permission: ${formData.get("permission") ?? "None"} · Verification: ${formData.get("verification") ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      item={item}
      items={items}
      onItemChange={(nextItem) => setItem(nextItem as ItemName)}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem
        name="permission"
        required
        onStatusChange={(status) => setStatus("permission", status)}
      >
        <QuestionnaireTitle>
          에이전트가 무엇을 고쳐도 될까요?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          답을 고르기 전까지 다음 버튼은 일부러 비활성 상태입니다.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="files">프로젝트 파일</QuestionnaireChoice>
          <QuestionnaireChoice value="tests">
            프로젝트 파일과 테스트
          </QuestionnaireChoice>
          <QuestionnaireChoice value="config">
            파일·테스트·설정
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem
        name="verification"
        required
        onStatusChange={(status) => setStatus("verification", status)}
      >
        <QuestionnaireTitle>
          완료 전에 무엇이 통과해야 하나요?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests">테스트</QuestionnaireChoice>
          <QuestionnaireChoice value="types">테스트와 타입</QuestionnaireChoice>
          <QuestionnaireChoice value="all">
            테스트·타입·화면 QA
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext
          className="data-[status=unanswered]:opacity-50"
          disabled={unanswered}
          variant="secondary"
        >
          다음
        </QuestionnaireNext>
        <QuestionnaireSubmit disabled={unanswered}>
          권한 저장
        </QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
