import { Marker, MarkerContent, MarkerIcon } from "@/styles/base-rhea/ui/marker"
import { Spinner } from "@/styles/base-rhea/ui/spinner"

export function ShimmerMarker() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">생각하는 중...</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="shimmer">파일 4개를 읽는 중</MarkerContent>
      </Marker>
    </div>
  )
}
