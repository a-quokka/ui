import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * 내용만큼만 차지하는 버튼.
 *
 * 드롭샷 `Button` 은 `w-full flex-col` 이라 부모 폭을 꽉 채운다. 그건 제품 전반의
 * 레이아웃 약속이므로 바꾸지 않는다. 그런데 사이드바 토글·캐러셀 화살표·
 * 페이지네이션 숫자처럼 **줄 안에 놓이는 작은 버튼**이 필요한 자리가 있다.
 * 그 자리를 위한 형제다. `IconButton`·`CloseButton` 과 같은 방식이다.
 *
 * 형태(높이·여백·간격)는 shadcn 것을 그대로 가져왔고 색·글꼴은 드롭샷 토큰이다.
 *
 * ## 아이콘 전용은 `size` 가 아니라 `iconOnly` 다
 *
 * shadcn 은 `size="icon-sm"` 처럼 크기 안에 아이콘 변형을 섞어 두었다. 드롭샷은
 * 크기와 모양을 섞지 않으므로 갈라 놓는다.
 *
 * | shadcn        | 여기            |
 * | ------------- | --------------- |
 * | `size="xs"`   | `size="XS"`     |
 * | `size="sm"`   | `size="S"`      |
 * | `size="icon-xs"` | `size="XS" iconOnly` |
 * | `size="icon-sm"` | `size="S" iconOnly`  |
 * | `size="icon"`    | `size="M" iconOnly`  |
 *
 * ! `themeColor` 에 `ghost`·`outline` 이 섞여 있는 것은 드롭샷 `Button` 의 관례를
 *   따른 것이다. 거기서도 색 목록 안에 `ghost` 가 들어 있다.
 *
 * ## 반경을 `rounded-2`(8px)로 둔 이유
 *
 * shadcn 버튼의 반경은 크기마다 다르다.
 *
 * | 크기 | shadcn 실제 값 | 여기 |
 * | --- | --- | --- |
 * | XS · S | `min(var(--radius-md), 10\|12px)` = **8px** | `rounded-2` — 정확히 같다 |
 * | M · L | `rounded-lg` = `--radius` = **10px** | `rounded-2` — 2px 작다 |
 *
 * 드롭샷 반경 스케일은 `rounded-N = N × 4px` 이라 **10px 단계가 없다.** 8px 과 12px
 * 사이에서 8px 을 골랐다. shadcn 자신이 작은 크기에 쓰는 값이고, 12px 로 올리면
 * 드롭샷 `Button` 의 pill 과 더 멀어진다.
 *
 * 드롭샷 `Button` 은 `rounded-[69px]` 완전 pill 이다. 이 컴포넌트는 치수를 shadcn
 * 에서 가져오는 것이 원칙이라 pill 을 따르지 않는다.
 *
 * ## 버튼 모양의 링크가 필요하면
 *
 * shadcn 은 `<Button render={<a … />} nativeButton={false} />` 로 태그를 바꾼다.
 * 그건 `@base-ui/react` 프리미티브의 기능이고, 여기서 얻는 것이 그것뿐이라
 * 걷어냈다. 대신 `inlineButtonVariants` 를 직접 쓰면 된다.
 *
 * ```tsx
 * <a className={cn(inlineButtonVariants({ themeColor: 'ghost', size: 'M', iconOnly: true }))} href={href}>
 *   {children}
 * </a>
 * ```
 *
 * 드롭샷 `Tooltip` 이 `tooltipVariants` 를 내보내는 것과 같은 방식이다.
 */
const inlineButtonVariants = cva(
  'group/inline-button relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-2 border border-transparent outline-none transition-all focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      themeColor: {
        primary: 'bg-primary-400 text-white hover:bg-primary-500 active:bg-primary-600',
        grayscale800: 'bg-grayscale-800 text-white hover:bg-grayscale-700 active:bg-grayscale-600',
        white:
          'bg-white text-grayscale-900 hover:bg-grayscale-75 active:bg-grayscale-200',
        red: 'bg-secondary-red-400 text-white hover:bg-secondary-red-300 active:bg-secondary-red-200',
        blue: 'bg-secondary-blue-400 text-white hover:bg-secondary-blue-500 active:bg-secondary-blue-600',
        outline:
          'border-solid border-grayscale-700 bg-transparent text-white hover:bg-grayscale-800 active:bg-grayscale-700',
        ghost: 'bg-transparent text-white hover:bg-grayscale-800 active:bg-grayscale-700',
      },
      /**
       * 치수는 shadcn 것을 그대로 쓰고 글꼴만 드롭샷 램프에서 가장 가까운 단계로
       * 바꾼다. 이게 이 작업의 원칙이다 — 색과 글꼴은 드롭샷, 나머지 px 은 shadcn.
       *
       *   shadcn `text-xs`(12) + medium   → `font-button4` 12/500/20
       *   shadcn `text-sm`(14) + medium   → `font-button3` 14/500/22
       *
       * ! shadcn `S` 의 글자는 `text-[0.8rem]`(12.8px)이다. 드롭샷 램프에 12.8px 이
       *   없어 `font-button4`(12px)로 내렸다. 0.8px 차이다.
       */
      size: {
        XS: "gap-1 font-button4 [&_svg:not([class*='size-'])]:size-3",
        S: "gap-1 font-button4 [&_svg:not([class*='size-'])]:size-3.5",
        M: "gap-1.5 font-button3 [&_svg:not([class*='size-'])]:size-4",
        L: "gap-1.5 font-button3 [&_svg:not([class*='size-'])]:size-4",
      },
      /** 정사각형으로 만들고 좌우 여백을 없앤다. 아이콘 하나만 넣는 자리다. */
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      /**
       * 글자가 있는 경우 — 여백과 높이는 shadcn 그대로다.
       *
       *   XS  h-6 px-2     24px 높이 · 좌우 8px
       *   S   h-7 px-2.5   28px · 10px
       *   M   h-8 px-2.5   32px · 10px
       *   L   h-9 px-2.5   36px · 10px
       *
       * 다만 높이를 `h-*` 로 **박지 않고** `min-h-*` + `py-*` 로 만든다. 박아 두면
       * 세로 여백이 "남는 공간"일 뿐이라 글자가 커지거나 두 줄이 되면 여백이 0이
       * 되고 결국 넘친다. 이렇게 두면 최소 여백이 보장되고 버튼이 늘어난다.
       * 보이는 높이는 shadcn 과 같다.
       *
       * ! 기본 클래스의 `border border-transparent` 때문에 XS·S 는 2px 커진다
       *   (26 · 30px). 이 투명 테두리가 있어야 `outline` 변형으로 바꿔도 크기가
       *   흔들리지 않는다. M · L 은 `min-h` 가 이겨 32 · 36px 그대로다.
       */
      {
        iconOnly: false,
        size: 'XS',
        class:
          'min-h-6 px-2 py-0.5 has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5',
      },
      {
        iconOnly: false,
        size: 'S',
        class:
          'min-h-7 px-2.5 py-1 has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5',
      },
      {
        iconOnly: false,
        size: 'M',
        class:
          'min-h-8 px-2.5 py-1 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
      },
      {
        iconOnly: false,
        size: 'L',
        class:
          'min-h-9 px-2.5 py-1.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
      },
      /**
       * 아이콘만 있는 경우 — shadcn 의 `size-6`·`size-7`·`size-8`·`size-9` 정사각형.
       * 여기도 최소 여백을 두어 아이콘이 커지면 잘리지 않고 늘어난다.
       */
      { iconOnly: true, size: 'XS', class: 'min-h-6 min-w-6 p-0.5' },
      { iconOnly: true, size: 'S', class: 'min-h-7 min-w-7 p-1' },
      { iconOnly: true, size: 'M', class: 'min-h-8 min-w-8 p-1' },
      { iconOnly: true, size: 'L', class: 'min-h-9 min-w-9 p-1.5' },
      // 꺼진 상태 — 면을 채우는 것과 비우는 것의 처리가 다르다.
      // 드롭샷 `Button` 이 compoundVariants 로 같은 구분을 한다.
      {
        themeColor: ['primary', 'grayscale800', 'red', 'blue', 'white'],
        class: 'disabled:bg-grayscale-600 disabled:text-grayscale-400',
      },
      {
        themeColor: 'outline',
        class: 'disabled:border-grayscale-700 disabled:bg-transparent disabled:text-grayscale-700',
      },
      {
        themeColor: 'ghost',
        class: 'disabled:bg-transparent disabled:text-grayscale-700',
      },
    ],
    defaultVariants: {
      themeColor: 'ghost',
      size: 'M',
      iconOnly: false,
    },
  }
);

/**
 * `ComponentPropsWithRef` 라 `ref` 와 `data-*` 를 그대로 넘길 수 있다.
 * 드롭샷 `IconButton` 이 같은 이유로 같은 타입을 쓴다 — 소비처가 바깥 클릭 판정이나
 * 포커스 복원에 `ref` 를 쓴다.
 */
type InlineButtonProps = ComponentPropsWithRef<'button'> & VariantProps<typeof inlineButtonVariants>;

const InlineButton = (props: InlineButtonProps) => {
  const { children, className, iconOnly, size, themeColor, type, ...restProps } = props;

  return (
    <button
      className={cn(inlineButtonVariants({ iconOnly, size, themeColor }), className)}
      data-slot={'inline-button'}
      type={type ?? 'button'}
      {...restProps}
    >
      {children}
    </button>
  );
};

export { InlineButton, inlineButtonVariants };
export type { InlineButtonProps };
