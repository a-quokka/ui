import { Marker, MarkerContent } from "@/styles/base-rhea/ui/marker"

export function MarkerSeparatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker variant="separator">
        <MarkerContent>오늘</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>42초 동안 작업했습니다</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>대화를 정리했습니다</MarkerContent>
      </Marker>
    </div>
  )
}
