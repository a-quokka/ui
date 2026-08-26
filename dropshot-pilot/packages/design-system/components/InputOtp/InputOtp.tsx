"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@configs/tailwind"
import { MinusIcon } from "lucide-react"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center rounded-2 has-aria-[invalid=true]:border-secondary-red-400 has-aria-[invalid=true]:ring-[3px] has-aria-[invalid=true]:ring-secondary-red-400/20 =true]:ring-secondary-red-400/40",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center border-y border-r border-grayscale-700 font-body3 transition-all outline-none first:rounded-l-2 first:border-l last:rounded-r-2 aria-[invalid=true]:border-secondary-red-400 data-[active=true]:z-10 data-[active=true]:border-primary-400 data-[active=true]:ring-[3px] data-[active=true]:ring-primary-400/50 data-[active=true]:aria-[invalid=true]:border-secondary-red-400 data-[active=true]:aria-[invalid=true]:ring-secondary-red-400/20 =true]:aria-[invalid=true]:ring-secondary-red-400/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-white duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon
      />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
