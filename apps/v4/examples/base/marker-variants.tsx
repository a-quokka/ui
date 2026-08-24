import { Marker, MarkerContent } from "@/styles/base-rhea/ui/marker"

export function MarkerVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker>
        <MarkerContent>짧은 메모에 쓰는 기본 마커입니다.</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>구분선 마커입니다</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>줄 경계를 나누는 테두리 마커입니다.</MarkerContent>
      </Marker>
    </div>
  )
}
