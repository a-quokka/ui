import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/styles/base-nova/ui/progress"

export function ProgressWithLabel() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>업로드 진행률</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
