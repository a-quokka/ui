import { Marker, MarkerContent } from "@/styles/base-rhea/ui/marker"

export function MarkerShimmerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker role="status">
        <MarkerContent className="shimmer">생각하는 중...</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="shimmer">파일 4개를 읽는 중</MarkerContent>
      </Marker>
    </div>
  )
}
