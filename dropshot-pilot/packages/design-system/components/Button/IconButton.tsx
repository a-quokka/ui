/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Button/IconButton.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 */
import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const iconButtonVariants = cva(
  'group flex items-center justify-center rounded-2 p-2 [&:disabled>img]:icon-filter-grayscale400 disabled:cursor-not-allowed disabled:bg-grayscale-600',
  {
    variants: {
      variant: {
        none: '[&:active>img]:icon-filter-white [&:hover>img]:icon-filter-white [&>img]:icon-filter-grayscale200',
        solid: '[&>img]:icon-filter-white hover:bg-grayscale-800 active:bg-grayscale-800',
        transparent: 'bg-emphasisLow [&>img]:icon-filter-white hover:bg-emphasisMedium active:bg-[rgba(0,0,0,0.50)]',
        white: 'bg-white [&>img]:icon-filter-grayscale900 hover:bg-grayscale-75',
      },
      size: {
        M: '[&>img]:size-6',
        S: '[&>img]:size-5',
      },
    },
    defaultVariants: { variant: 'none', size: 'M' },
  }
);

interface Props extends VariantProps<typeof iconButtonVariants>, ComponentPropsWithRef<'button'> {
  variant?: 'none' | 'solid' | 'transparent' | 'white';
  size?: 'M' | 'S';
}

const IconButton = ({ variant = 'none', size = 'M', children, className, ...restProps }: Props) => {
  return (
    <button className={iconButtonVariants({ variant, size, className })} type={'button'} {...restProps}>
      {children}
    </button>
  );
};

export default IconButton;
