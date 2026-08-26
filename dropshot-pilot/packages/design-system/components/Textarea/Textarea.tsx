import * as React from "react"

import { cn } from "@configs/tailwind"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-2 border border-grayscale-700 bg-transparent px-2.5 py-2 font-body1 transition-colors outline-none placeholder:text-grayscale-400 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:cursor-not-allowed disabled:bg-grayscale-700/50 disabled:opacity-50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-[3px] aria-[invalid=true]:ring-secondary-red-400/20 md:font-body3 =true]:border-secondary-red-400/50 =true]:ring-secondary-red-400/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
