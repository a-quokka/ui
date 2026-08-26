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
      size: {
        XS: 'gap-1 font-button4 [&_svg:not([class*="size-"])]:size-3',
        S: 'gap-1 font-button4 [&_svg:not([class*="size-"])]:size-3.5',
        M: 'gap-1.5 font-button3 [&_svg:not([class*="size-"])]:size-4',
        L: 'gap-1.5 font-button3 [&_svg:not([class*="size-"])]:size-4',
      },
      /** 정사각형으로 만들고 좌우 여백을 없앤다. 아이콘 하나만 넣는 자리다. */
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // 글자가 있는 경우 — 높이와 좌우 여백. 아이콘이 붙는 쪽은 여백을 조금 줄인다.
      {
        iconOnly: false,
        size: 'XS',
        class: 'h-6 px-2 has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5',
      },
      {
        iconOnly: false,
        size: 'S',
        class: 'h-7 px-2.5 has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5',
      },
      {
        iconOnly: false,
        size: 'M',
        class: 'h-8 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
      },
      {
        iconOnly: false,
        size: 'L',
        class: 'h-9 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
      },
      // 아이콘만 있는 경우 — 정사각형
      { iconOnly: true, size: 'XS', class: 'size-6' },
      { iconOnly: true, size: 'S', class: 'size-7' },
      { iconOnly: true, size: 'M', class: 'size-8' },
      { iconOnly: true, size: 'L', class: 'size-9' },
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
