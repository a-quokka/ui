/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Tooltip/Tooltip.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 */
import React, { type HTMLAttributes, useState } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * ! hover와 함께 키보드 focus에서도 뜬다. 단축키·설명을 tooltip으로만 노출하는 화면에서
 * hover 전용이면 키보드 사용자가 볼 방법이 없다.
 *
 * `group-focus-within`이 아니라 `group-has-[:focus-visible]`인 이유는 **마우스 클릭으로 생긴
 * focus를 제외**하기 위해서다. focus-within이면 버튼을 클릭한 뒤에도 tooltip이 남아 기존
 * 소비처(aiStudio·stock)의 동작이 바뀐다.
 */
export const tooltipVariants = cva(
  `absolute hidden group-hover/tooltip:inline-block group-has-[:focus-visible]/tooltip:inline-block`,
  {
    variants: {
      position: {
        top: `left-1/2`,
        bottom: `left-1/2`,
        left: `top-1/2`,
        right: `top-1/2`,
        'bottom-end': `right-0`,
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);
export const tooltipLabelVariants = cva(`absolute z-tooltip whitespace-pre shadow-dropBox`, {
  variants: {
    position: {
      top: `bottom-0 -translate-x-1/2 -translate-y-[6px]`,
      bottom: `top-0 -translate-x-1/2 translate-y-[6px]`,
      left: `right-0 -translate-y-1/2 translate-x-[-6px]`,
      right: `left-0 -translate-y-1/2 translate-x-[6px]`,
      'bottom-end': `right-0 top-0 translate-y-[6px]`,
    },
    size: {
      default: `rounded-2 px-3 py-1.5`,
      small: `font-caption1 rounded-1 px-2 py-1`,
    },
    themeColor: {
      grayscale950: `bg-grayscale-950 text-white`,
      grayscale800: `bg-grayscale-800 text-white`,
      primary400: `bg-primary-400 text-white`,
    },
  },
  defaultVariants: {
    position: 'top',
    size: 'default',
    themeColor: 'grayscale800',
  },
});

export const tooltipTailWrapperVariants = cva(`absolute z-tooltip`, {
  variants: {
    position: {
      top: `bottom-0 -translate-x-1/2`,
      bottom: `top-0 -translate-x-1/2 rotate-180`,
      left: `right-0 -translate-y-1/2 -rotate-90`,
      right: `left-0 -translate-y-1/2 rotate-90`,
      'bottom-end': `right-4 top-0 rotate-180`,
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

export const tooltipTailVariants = cva(`triangle`, {
  variants: {
    themeColor: {
      grayscale950: `bg-grayscale-950`,
      grayscale800: `bg-grayscale-800`,
      primary400: `bg-primary-400`,
    },
  },
  defaultVariants: {
    themeColor: 'grayscale800',
  },
});

export type TooltipProps = Pick<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> &
  VariantProps<typeof tooltipVariants> &
  VariantProps<typeof tooltipLabelVariants> &
  VariantProps<typeof tooltipTailWrapperVariants> &
  VariantProps<typeof tooltipTailVariants> & {
    label: React.ReactNode;
    gap?: 0 | 4 | 8 | 12 | 16 | 20;
    hidden?: boolean;
    type?: 'click';
    shouldShow?: boolean;
  };
const getBasePosition = (position: string) => {
  if (position.startsWith('bottom-end')) {
    return 'bottom';
  }
  return position;
};

const Tooltip = ({
  position = 'top',
  themeColor,
  children,
  label,
  className,
  gap = 4,
  hidden = false,
  size,
  type,
  shouldShow,
}: TooltipProps) => {
  const isClickType = type === 'click';
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isClickType) {
      setIsOpen((prev) => !prev);
    }
  };

  const getVisibilityClass = () => {
    if (shouldShow === true) {
      return '!inline-block';
    }

    if (shouldShow === false) {
      return '!hidden';
    }

    if (isClickType) {
      return isOpen ? '!inline-block' : '!hidden';
    }

    if (hidden) {
      return 'group-hover/tooltip:hidden';
    }

    return '';
  };

  const basePosition = getBasePosition(position ?? 'top');

  return (
    <div className={cn('group/tooltip relative flex')} onClick={handleClick}>
      <div
        className={cn(tooltipVariants({ position, className }), `-${basePosition}-${gap / 4}`, getVisibilityClass())}
      >
        {label && <span className={tooltipLabelVariants({ position, size, themeColor })}>{label}</span>}

        <div className={tooltipTailWrapperVariants({ position })}>
          <div className={tooltipTailVariants({ themeColor })} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
