const tags = [
  "디자인",
  "엔지니어링",
  "마케팅",
  "프로덕트",
  "리서치",
  "영업",
  "지원",
  "운영",
  "재무",
  "법무",
  "인사",
  "보안",
]

export function ScrollFadeHorizontal() {
  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
      <div className="scroll-fade-x scrollbar-none overflow-x-auto">
        <div className="flex w-max gap-1.5 p-1.5">
          {tags.map((tag) => (
            <div
              key={tag}
              className="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
