import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * **비교용이다. 이 파일을 드롭샷에 그대로 넣지 마라.**
 *
 * 드롭샷 `Button` 에 shadcn 의 형태(px 값)를 입히면 어떻게 되는지 보려고 만들었다.
 * 색·글꼴·prop 이름은 드롭샷 것을 그대로 쓰고, 크기 체계만 shadcn 것을 가져왔다.
 * 기존 `Button.tsx` 와 나란히 놓고 보라. 차이는 `../COMPARE.md` 에 정리했다.
 *
 * ! **가장 큰 변화는 반경이 아니라 폭이다.** 드롭샷 `Button` 의 기본은
 *   `w-full flex-col` 이다 — 부모 폭을 꽉 채우고 자식을 세로로 쌓는다. shadcn 은
 *   `inline-flex` 라 내용만큼만 차지한다. 이 파일은 shadcn 쪽을 따랐으므로,
 *   그대로 바꾸면 **제품의 모든 버튼이 폭을 잃는다.** 레이아웃이 통째로 달라진다.
 *
 * ! 두 번째는 높이 계산 방식이다. 드롭샷은 글꼴 행간 + 상하 패딩으로 높이가
 *   정해지고(예 M = 24 + 16 = 40px), shadcn 은 높이를 직접 박는다(M = 32px).
 *   그래서 같은 `M` 이라도 8px 낮아진다.
 *
 * ! 세 번째는 반경이다. 드롭샷은 `rounded-[69px]` 완전 pill, shadcn 은 8px 이다.
 *   여기서는 shadcn 을 따라 `rounded-2`(8px)를 썼다.
 */
const buttonVariants = cva(
  'group/button relative inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-2 border border-transparent text-white outline-none transition-all disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      themeColor: {
        primary: 'bg-primary-400 hover:bg-primary-500 active:bg-primary-600',
        grayscale800: 'bg-grayscale-800 hover:bg-grayscale-700 active:bg-grayscale-600',
        grayscale900:
          'border-solid border-white bg-grayscale-900 hover:bg-grayscale-800 active:bg-grayscale-700',
        white:
          'bg-white text-grayscale-900 hover:bg-grayscale-75 active:bg-grayscale-200 disabled:text-grayscale-400',
        red: 'bg-secondary-red-400 hover:bg-secondary-red-300 active:bg-secondary-red-200',
        blue: 'bg-secondary-blue-400 hover:bg-secondary-blue-500 active:bg-secondary-blue-600',
        ghost:
          'border-solid border-white bg-transparent text-white active:border-transparent active:bg-grayscale-75 active:text-grayscale-900',
      },
      // shadcn 의 크기 체계를 드롭샷 어휘로 옮긴 것 — xs→XS · sm→S · default→M · lg→L
      size: {
        XS: "h-6 gap-1 px-2 font-button4 [&_svg:not([class*='size-'])]:size-3",
        S: "h-7 gap-1 px-2.5 font-button4 [&_svg:not([class*='size-'])]:size-3.5",
        M: "h-8 px-2.5 font-button3 [&_svg:not([class*='size-'])]:size-4",
        L: "h-9 px-2.5 font-button3 [&_svg:not([class*='size-'])]:size-4",
      },
      disabled: {
        true: 'disabled:bg-grayscale-600 disabled:text-grayscale-400',
        false: '',
      },
    },
    defaultVariants: {
      themeColor: 'primary',
      size: 'M',
    },
  }
);

type ButtonProps = Pick<
  ComponentProps<'button'>,
  'children' | 'className' | 'disabled' | 'onClick' | 'type'
> &
  VariantProps<typeof buttonVariants> & {
    /** 눌린 뒤 결과를 기다리는 동안 내용을 감추고 스피너를 올린다. 드롭샷 원본과 같다. */
    loading?: boolean;
    /** 스피너 자리. 드롭샷은 `Spinner` 를 쓴다. 비교용이라 주입식으로 두었다. */
    spinner?: ReactNode;
  };

const Button = (props: ButtonProps) => {
  const { children, className, disabled, loading, onClick, size, spinner, themeColor, type } = props;

  return (
    <button
      className={cn(buttonVariants({ disabled, size, themeColor }), className)}
      data-slot={'button'}
      disabled={loading || disabled}
      type={type ?? 'button'}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className={'invisible flex opacity-0'}>{children}</span>
          <span className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}>{spinner}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export { Button, buttonVariants };
export type { ButtonProps };
