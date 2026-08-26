import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@configs/tailwind"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-2 border border-grayscale-700 bg-transparent px-2.5 py-1 font-body1 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-subtitle4 file:text-white placeholder:text-grayscale-400 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-grayscale-700/50 disabled:opacity-50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 md:font-body3 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
