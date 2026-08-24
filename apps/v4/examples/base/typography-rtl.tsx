"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "웃음에 매긴 세금: 농담세 연대기",
      leadParagraph:
        "Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.",
      kingsPlan: "The King's Plan",
      kingThought: "The king thought long and hard, and finally came up with",
      brilliantPlan: "a brilliant plan",
      taxJokes: ": he would tax the jokes in the kingdom.",
      blockquote:
        '"After all," he said, "everyone enjoys a good joke, so it\'s only fair that they should pay for the privilege."',
      jokeTax: "The Joke Tax",
      subjectsNotAmused:
        "The king's subjects were not amused. They grumbled and complained, but the king was firm:",
      level1: "1st level of puns: 5 gold coins",
      level2: "2nd level of jokes: 10 gold coins",
      level3: "3rd level of one-liners: 20 gold coins",
      stoppedTelling:
        "As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.",
      jokestersRevolt: "Jokester's Revolt",
      sneaking:
        "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.",
      discovered:
        "And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.",
      peoplesRebellion: "The People's Rebellion",
      uplifted:
        "The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.",
      kingsTreasury: "King's Treasury",
      peoplesHappiness: "People's happiness",
      empty: "Empty",
      overflowing: "Overflowing",
      modest: "Modest",
      satisfied: "Satisfied",
      full: "Full",
      ecstatic: "Ecstatic",
      realized:
        "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.",
      moral:
        "The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      title: "웃음에 매긴 세금: 농담세 연대기",
      leadParagraph:
        "옛날 어느 먼 나라에, 하루 종일 왕좌에 늘어져 있는 아주 게으른 왕이 있었습니다. 어느 날 신하들이 문제를 들고 왔습니다. 나라의 곳간이 바닥나고 있었던 것입니다.",
      kingsPlan: "왕의 계획",
      kingThought: "왕은 오래 고민한 끝에 마침내",
      brilliantPlan: "기막힌 계획",
      taxJokes:
        "을 떠올렸습니다. 나라 안의 모든 농담에 세금을 매기기로 한 것입니다.",
      blockquote:
        '"어차피" 왕이 말했습니다. "누구나 좋은 농담을 즐기니, 그 값을 치르는 게 공평하지 않겠느냐."',
      jokeTax: "농담세",
      subjectsNotAmused:
        "백성들은 조금도 즐겁지 않았습니다. 투덜대고 불평했지만 왕은 단호했습니다.",
      level1: "1단계 말장난: 금화 5닢",
      level2: "2단계 농담: 금화 10닢",
      level3: "3단계 한 줄 유머: 금화 20닢",
      stoppedTelling:
        "그 뒤로 사람들은 농담을 하지 않게 됐고, 나라에는 우울이 내려앉았습니다. 하지만 왕의 어리석음에 굴하지 않은 사람이 하나 있었습니다. 조커스터라는 이름의 궁정 광대였습니다.",
      jokestersRevolt: "조커스터의 반란",
      sneaking:
        "조커스터는 한밤중에 성으로 숨어들어 여기저기에 농담을 남기기 시작했습니다. 왕의 베개 밑에, 수프 속에, 심지어 왕실 화장실에까지. 왕은 노발대발했지만 조커스터를 막을 수 없었습니다.",
      discovered:
        "그러던 어느 날, 나라 사람들은 조커스터가 남긴 농담이 너무 웃겨서 도저히 참을 수 없다는 걸 알게 됐습니다. 그리고 한번 웃기 시작하자 멈출 수가 없었습니다.",
      peoplesRebellion: "백성들의 반란",
      uplifted:
        "웃음에 기운을 얻은 백성들은 다시 농담과 말장난을 나누기 시작했고, 곧 온 나라가 그 농담에 함께했습니다.",
      kingsTreasury: "왕의 곳간",
      peoplesHappiness: "백성의 행복",
      empty: "텅 빔",
      overflowing: "넘침",
      modest: "조금",
      satisfied: "만족",
      full: "가득",
      ecstatic: "환희",
      realized:
        "백성들이 훨씬 행복해진 것을 본 왕은 자기 잘못을 깨닫고 농담세를 없앴습니다. 조커스터는 영웅이 됐고, 나라는 오래오래 행복했습니다.",
      moral:
        "이 이야기의 교훈은 이렇습니다. 좋은 웃음의 힘을 얕보지 말 것, 그리고 나쁜 아이디어를 늘 조심할 것.",
    },
  },
}

export function TypographyRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div dir={dir}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t.title}
      </h1>
      <p className="text-xl leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
        {t.leadParagraph}
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t.kingsPlan}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t.kingThought}{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          {t.brilliantPlan}
        </a>
        {t.taxJokes}
      </p>
      <blockquote className="mt-6 border-s-2 ps-6 italic">
        {t.blockquote}
      </blockquote>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t.jokeTax}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t.subjectsNotAmused}
      </p>
      <ul className="my-6 ms-6 list-disc [&>li]:mt-2">
        <li>{t.level1}</li>
        <li>{t.level2}</li>
        <li>{t.level3}</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.stoppedTelling}</p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t.jokestersRevolt}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.sneaking}</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.discovered}</p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t.peoplesRebellion}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.uplifted}</p>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-start font-bold">
                {t.kingsTreasury}
              </th>
              <th className="border px-4 py-2 text-start font-bold">
                {t.peoplesHappiness}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-start">{t.empty}</td>
              <td className="border px-4 py-2 text-start">{t.overflowing}</td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-start">{t.modest}</td>
              <td className="border px-4 py-2 text-start">{t.satisfied}</td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-start">{t.full}</td>
              <td className="border px-4 py-2 text-start">{t.ecstatic}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.realized}</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{t.moral}</p>
    </div>
  )
}
