import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * shadcn Badge 의 형태(높이 20px · 좌우 8px · 아이콘 간격 4px)를 그대로 가져오고
 * 색과 글꼴만 드롭샷 토큰으로 바꿨다.
 *
 * 원본과 다르게 한 것 셋:
 *
 * 1. `useRender`/`mergeProps`(@base-ui/react)를 걷어내고 평범한 `span` 으로 바꿨다.
 *    배지 하나 때문에 런타임 의존성을 새로 들이는 건 과하고, 드롭샷에는 render prop
 *    관례가 없다. 다른 태그로 그려야 하면 `asChild` 대신 감싸는 쪽에서 처리한다.
 * 2. 반경은 `rounded-full` 이다. 원본은 `rounded-4xl`(26px)인데 의도가 pill 이고,
 *    드롭샷 반경 스케일은 24px(`rounded-6`)에서 끝난다.
 * 3. `dark:` 변형은 지웠다. 드롭샷 토큰이 이미 어두운 면 기준이다.
 */
const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 font-button4 whitespace-nowrap transition-all has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 [&>svg]:pointer-events-none [&>svg]:!size-3',
  {
    variants: {
      themeColor: {
        primary: 'bg-primary-400 text-white [a]:hover:bg-primary-500',
        grayscale800: 'bg-grayscale-800 text-white [a]:hover:bg-grayscale-700',
        red: 'bg-secondary-red-900 text-secondary-red-300 [a]:hover:bg-secondary-red-800',
        outline:
          'border-grayscale-700 text-white [a]:hover:bg-grayscale-800 [a]:hover:text-grayscale-300',
        ghost: 'hover:bg-grayscale-800 hover:text-grayscale-300',
        link: 'text-primary-300 underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      themeColor: 'primary',
    },
  }
);

type BadgeProps = Pick<ComponentProps<'span'>, 'children' | 'className'> & VariantProps<typeof badgeVariants>;

const Badge = (props: BadgeProps) => {
  const { children, className, themeColor } = props;

  return (
    <span className={cn(badgeVariants({ themeColor }), className)} data-slot={'badge'}>
      {children}
    </span>
  );
};

export { Badge, badgeVariants };
export type { BadgeProps };
