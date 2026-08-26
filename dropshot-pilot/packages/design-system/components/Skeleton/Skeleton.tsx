/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Skeleton/Skeleton.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 */
import type { ComponentProps } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * 스켈레톤 배경색 규칙:
 *
 * 1. 부모가 grayscale-900 배경인 경우 — 배경 grayscale-850 / 그림자 grayscale-800
 * 2. 부모가 grayscale-850 배경인 경우 — 배경 grayscale-800 / 그림자 grayscale-700
 *
 * 배경색은 항상 부모보다 한 단계 밝게, 그림자는 배경색보다 한 단계 어둡게 사용합니다.
 */
type SkeletonProps = Pick<ComponentProps<'div'>, 'children' | 'className' | 'style'> & {
  shadow?: 'grayscale800' | 'grayscale700';
};

const skeletonVariants = cva('h-full w-0 shadow-[0_0_75px_75px]', {
  variants: {
    shadow: {
      grayscale800: 'shadow-grayscale-800',
      grayscale700: 'shadow-grayscale-700',
    },
  },
  defaultVariants: { shadow: 'grayscale800' },
});

const Skeleton = (props: SkeletonProps) => {
  const { children, className, shadow, style } = props;

  return (
    <div className={cn('relative flex min-h-fit items-center overflow-hidden', className)} style={style}>
      <div className={'absolute size-full animate-skeleton'}>
        <div className={cn(skeletonVariants({ shadow }))} />
      </div>
      {children}
    </div>
  );
};

type SkeletonBlockProps = {
  className?: string;
  bgColor?: 'grayscale850' | 'grayscale800';
};

const skeletonBlockVariants = cva('flex w-full', {
  variants: {
    bgColor: {
      grayscale800: 'bg-grayscale-800',
      grayscale850: 'bg-grayscale-850',
    },
  },
  defaultVariants: { bgColor: 'grayscale850' },
});

const SkeletonBlock = (props: SkeletonBlockProps) => {
  const { className, bgColor } = props;

  return <div className={cn(skeletonBlockVariants({ bgColor }), className)} />;
};

export { Skeleton, SkeletonBlock };
export type { SkeletonProps, SkeletonBlockProps };
