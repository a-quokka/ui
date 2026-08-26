"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@configs/tailwind"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-grayscale-700 outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-[checked]:border-grayscale-700 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 aria-[invalid=true]:aria-checked:border-primary-400 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40 data-[checked]:border-primary-400 data-[checked]:bg-primary-400 data-[checked]:text-white group-has-[:focus-visible]/field-label:data-[checked]:border-primary-400",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
