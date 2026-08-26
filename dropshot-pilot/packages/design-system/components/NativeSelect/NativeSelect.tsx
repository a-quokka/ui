import * as React from "react"

import { cn } from "@configs/tailwind"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-8 w-full min-w-0 appearance-none rounded-2 border border-grayscale-700 bg-transparent py-1 pr-8 pl-2.5 font-body3 transition-colors outline-none select-none selection:bg-primary-400 selection:text-white placeholder:text-grayscale-400 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40"
        {...props}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-grayscale-400 select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
