"use client"

import * as React from "react"
import { ko } from "date-fns/locale"
import type { DayButton, Locale } from "react-day-picker"
import { DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@configs/tailwind"
import { InlineButton, inlineButtonVariants } from "../Button/InlineButton"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  // 이 포크는 한국어 문서다. 넘기지 않으면 월·요일이 영어로 나온다.
  locale = ko,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-grayscale-900 p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:[&_.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:[&_.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          inlineButtonVariants({ variant: buttonVariant }),
          "size-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          inlineButtonVariants({ variant: buttonVariant }),
          "size-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center gap-1.5 font-subtitle4",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "cn-calendar-dropdown-root relative rounded-[var(--cell-radius)]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-grayscale-850 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "cn-calendar-caption font-body3"
            : "cn-calendar-caption-label flex items-center gap-1 rounded-[var(--cell-radius)] font-body3 [&>svg]:size-3.5 [&>svg]:text-grayscale-400",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-[var(--cell-radius)] text-[0.8rem] font-normal text-grayscale-400 select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[var(--cell-size)] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-grayscale-400 select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-[var(--cell-radius)] p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-[var(--cell-radius)]",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-[var(--cell-radius)]"
            : "[&:first-child[data-selected=true]_button]:rounded-l-[var(--cell-radius)]",
          defaultClassNames.day
        ),
        range_start: cn(
          "relative isolate z-0 rounded-l-[var(--cell-radius)] bg-grayscale-800 after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-grayscale-800",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-[var(--cell-radius)] bg-grayscale-800 after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-grayscale-800",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-[var(--cell-radius)] bg-grayscale-800 text-white data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-grayscale-400 aria-selected:text-grayscale-400",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-grayscale-400 opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("cn-rtl-flip size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("cn-rtl-flip size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[var(--cell-size)] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <InlineButton
      themeColor="ghost"
      size={"M"} iconOnly
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-[var(--cell-size)] flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-primary-400 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-primary-400/50 data-[range-end=true]:rounded-[var(--cell-radius)] data-[range-end=true]:rounded-r-[var(--cell-radius)] data-[range-end=true]:bg-primary-400 data-[range-end=true]:text-white data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-grayscale-800 data-[range-middle=true]:text-white data-[range-start=true]:rounded-[var(--cell-radius)] data-[range-start=true]:rounded-l-[var(--cell-radius)] data-[range-start=true]:bg-primary-400 data-[range-start=true]:text-white data-[selected-single=true]:bg-primary-400 data-[selected-single=true]:text-white [&>span]:font-caption1 [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
