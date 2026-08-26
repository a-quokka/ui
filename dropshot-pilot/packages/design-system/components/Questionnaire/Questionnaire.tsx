"use client"

import * as React from "react"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"

import { cn } from "@configs/tailwind"
import type { Button } from "../Button/Button"
import { inlineButtonVariants } from "../Button/InlineButton"
import { CheckIcon } from "lucide-react"

function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex w-full min-w-0 flex-col gap-4", className)}
      {...props}
    />
  )
}

function QuestionnaireProgress({
  className,
  children,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      className={cn(
        "min-h-[1lh] w-fit min-w-[14ch] font-button4 text-grayscale-400 tabular-nums",
        className
      )}
      // 프리미티브의 기본 문구는 `Question 1 of 3` 이다. 한국어 어순에 맞게 다시 쓴다.
      render={
        render ??
        (children
          ? undefined
          : (renderProps, state) => (
              <div {...renderProps}>
                {state.total ? `질문 ${state.current} / ${state.total}` : null}
              </div>
            ))
      }
      {...props}
    >
      {children}
    </QuestionnairePrimitive.Progress>
  )
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn(
        "flex min-w-0 flex-col gap-4 border-0 p-0 outline-none",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn(
        "cn-font-heading font-button2 leading-snug text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn("font-body3 text-pretty text-grayscale-400", className)}
      {...props}
    />
  )
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn(
        "group/questionnaire-choices grid min-w-0 gap-2",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireChoice({
  children,
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        "group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start gap-2.5 rounded-2 border border-grayscale-700 bg-transparent px-3 py-2.5 text-start font-body3 transition-colors outline-none select-none hover:bg-grayscale-800/50 has-[>input:focus-visible]:border-primary-400 has-[>input:focus-visible]:ring-[3px] has-[>input:focus-visible]:ring-primary-400/50 data-[invalid]:border-secondary-red-400 data-[checked]:border-primary-400/40 data-[checked]:bg-grayscale-800",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        className="pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[4px] border border-grayscale-700 group-has-[[data-slot=questionnaire-choice-description]]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:border-primary-400 group-data-checked/questionnaire-choice:bg-primary-400 group-data-checked/questionnaire-choice:text-white"
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          className="hidden size-2 rounded-full bg-white group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
        />
        <CheckIcon data-slot="questionnaire-choice-indicator-check" className="hidden size-3.5 group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block" />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        className="flex min-w-0 flex-1 flex-col gap-0.5 leading-snug"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className="pointer-events-none ms-auto hidden size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-2 border border-grayscale-700 bg-grayscale-900 font-mono text-[0.625rem] leading-none font-medium text-grayscale-400 group-has-[[data-slot=questionnaire-choice-description]]/questionnaire-choice:translate-y-0.5 group-data-[shortcut]/questionnaire-choice:inline-flex"
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireChoiceDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      className={cn("text-grayscale-400", className)}
      {...props}
    />
  )
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <div
      data-slot="questionnaire-input-wrapper"
      className="group/questionnaire-input relative w-full min-w-0"
    >
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        className={cn(
          "h-8 min-h-11 w-full min-w-0 rounded-2 border border-grayscale-700 bg-transparent px-2.5 py-1 font-body1 transition-[color,box-shadow,background-color] outline-none focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-grayscale-700/50 disabled:opacity-50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 sm:min-h-0 md:font-body3 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40",
          "selection:bg-primary-400 selection:text-white placeholder:text-grayscale-400",
          className
        )}
        {...props}
      />
    </div>
  )
}

function QuestionnaireError({
  className,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn("mt-2 font-body3 text-secondary-red-400", className)}
      {...props}
    >
      {/* 프리미티브 기본값이 영어라 한국어 문구를 넣는다. 필수·선택 구분은
          프리미티브만 알고 있으므로 양쪽에 통하는 한 문장으로 쓴다. */}
      {children ?? "답을 골라 주세요."}
    </QuestionnairePrimitive.Error>
  )
}

function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn(
        "grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-8",
        className
      )}
      {...props}
    />
  )
}

function QuestionnairePrevious({
  children,
  className,
  size = "default",
  variant = "outline",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      data-size={size}
      data-variant={variant}
      className={cn(
        inlineButtonVariants({ size, variant }),
        "col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0",
        className
      )}
      {...props}
    >
      {children ?? "이전"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  children,
  className,
  size = "default",
  variant = "outline",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      data-size={size}
      data-variant={variant}
      className={cn(
        inlineButtonVariants({ size, variant }),
        "col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className
      )}
      {...props}
    >
      {children ?? "건너뛰기"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  children,
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      data-size={size}
      data-variant={variant}
      className={cn(
        inlineButtonVariants({ size, variant }),
        "col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className
      )}
      {...props}
    >
      {children ?? "다음"}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  children,
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      data-size={size}
      data-variant={variant}
      className={cn(
        inlineButtonVariants({ size, variant }),
        "col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
        className
      )}
      {...props}
    >
      {children ?? "제출"}
    </QuestionnairePrimitive.Submit>
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
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
}
