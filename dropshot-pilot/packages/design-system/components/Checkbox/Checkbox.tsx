"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@configs/tailwind"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-grayscale-700 transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-[checked]:border-grayscale-700 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 aria-[invalid=true]:aria-checked:border-primary-400 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40 data-[checked]:border-primary-400 data-[checked]:bg-primary-400 data-[checked]:text-white group-has-[:focus-visible]/field-label:data-[checked]:border-primary-400",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
