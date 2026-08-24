import { BookOpenCheck, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/styles/base-rhea/ui/marker"

export function MarkerIconDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Marker>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>새 브랜치로 옮겼습니다</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>파일 4개를 살펴봤습니다</MarkerContent>
      </Marker>
      <Marker className="flex-col">
        <MarkerIcon>
          <BookOpenCheck />
        </MarkerIcon>
        <MarkerContent>동기화가 끝났습니다</MarkerContent>
      </Marker>
    </div>
  )
}
