import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-accent after:absolute after:inset-0 after:animate-skeleton after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
