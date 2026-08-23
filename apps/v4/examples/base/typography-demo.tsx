export function TypographyDemo() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        웃음에 매긴 세금: 농담세 연대기
      </h1>
      <p className="text-xl leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
        옛날 어느 먼 나라에, 하루 종일 왕좌에 늘어져 있는 아주 게으른 왕이
        있었습니다. 어느 날 신하들이 문제를 들고 왔습니다. 나라의 곳간이
        바닥나고 있었던 것입니다.
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        왕의 계획
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        왕은 오래 고민한 끝에 마침내{" "}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          기막힌 계획
        </a>
        을 떠올렸습니다. 나라 안의 모든 농담에 세금을 매기기로 한 것입니다.
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        &quot;어차피&quot; 왕이 말했습니다. &quot;누구나 좋은 농담을 즐기니, 그
        값을 치르는 게 공평하지 않겠느냐.&quot;
      </blockquote>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        농담세
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        백성들은 조금도 즐겁지 않았습니다. 투덜대고 불평했지만 왕은
        단호했습니다.
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>1단계 말장난: 금화 5닢</li>
        <li>2단계 농담: 금화 10닢</li>
        <li>3단계 한 줄 유머: 금화 20닢</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        그 뒤로 사람들은 농담을 하지 않게 됐고, 나라에는 우울이 내려앉았습니다.
        하지만 왕의 어리석음에 굴하지 않은 사람이 하나 있었습니다. 조커스터라는
        이름의 궁정 광대였습니다.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        조커스터의 반란
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        조커스터는 한밤중에 성으로 숨어들어 여기저기에 농담을 남기기
        시작했습니다. 왕의 베개 밑에, 수프 속에, 심지어 왕실 화장실에까지. 왕은
        노발대발했지만 조커스터를 막을 수 없었습니다.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        그러던 어느 날, 나라 사람들은 조커스터가 남긴 농담이 너무 웃겨서 도저히
        참을 수 없다는 걸 알게 됐습니다. 그리고 한번 웃기 시작하자 멈출 수가
        없었습니다.
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        백성들의 반란
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        웃음에 기운을 얻은 백성들은 다시 농담과 말장난을 나누기 시작했고, 곧 온
        나라가 그 농담에 함께했습니다.
      </p>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                왕의 곳간
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                백성의 행복
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                텅 빔
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                넘침
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                조금
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                만족
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                가득
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                환희
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        백성들이 훨씬 행복해진 것을 본 왕은 자기 잘못을 깨닫고 농담세를
        없앴습니다. 조커스터는 영웅이 됐고, 나라는 오래오래 행복했습니다.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        이 이야기의 교훈은 이렇습니다. 좋은 웃음의 힘을 얕보지 말 것, 그리고
        나쁜 아이디어를 늘 조심할 것.
      </p>
    </div>
  )
}
