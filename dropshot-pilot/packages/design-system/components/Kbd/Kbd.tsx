import { cn } from "@configs/tailwind"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-1 bg-grayscale-800 px-1 font-sans font-button4 text-grayscale-400 select-none [[data-slot=tooltip-content]_&]:bg-grayscale-900/20 [[data-slot=tooltip-content]_&]:text-grayscale-900 =tooltip-content]_&]:bg-grayscale-900/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
