import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * shadcn Alert 의 형태를 그대로 가져왔다 — 좌우 10px · 위아래 8px, 아이콘이 있으면
 * `auto 1fr` 두 칸 그리드로 바뀌고 제목·본문이 오른쪽 칸에 쌓인다.
 *
 * 색은 면 위계를 따른다. 배경 `grayscale-850` 은 부모가 `grayscale-900` 일 때
 * 한 단계 밝은 면이다. Skeleton 의 규칙과 같다.
 *
 * `destructive` 는 배경을 빨갛게 채우지 않고 글자만 빨갛게 둔다. 알림은 읽는 것이
 * 목적이고 채운 빨강 위 흰 글자는 대비가 4.5 를 못 넘긴다.
 *
 * ! `AlertAction` 을 쓰면 오른쪽에 72px 를 비워 둔다(`pr-18`). 버튼이 본문 위로
 *   겹치지 않게 하려는 원본 의도라 값을 그대로 남겼다.
 *
 * ! 본문의 줄바꿈 규칙을 뒤집어 적었다. 원본은 `text-balance md:text-pretty`
 *   (좁은 화면에서 balance, 768px 이상에서 pretty)인데, 드롭샷의 화면 접두사는
 *   **max-width 기준**이라 `md:` 를 그대로 쓰면 뜻이 반대가 된다. 기본을 pretty 로
 *   두고 `sm:`(1023px 이하)에서 balance 로 돌린다. 의도는 같고 기준점만 다르다.
 */
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-2 border px-2.5 py-2 text-left font-body3 has-[[data-slot=alert-action]]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 [&>svg]:row-span-2 [&>svg]:translate-y-0.5 [&>svg]:text-current [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      themeColor: {
        grayscale850: 'border-grayscale-700 bg-grayscale-850 text-white',
        red: 'border-grayscale-700 bg-grayscale-850 text-secondary-red-300 [&>[data-slot=alert-description]]:text-secondary-red-300/90',
      },
    },
    defaultVariants: {
      themeColor: 'grayscale850',
    },
  }
);

type AlertProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & VariantProps<typeof alertVariants>;

const Alert = (props: AlertProps) => {
  const { children, className, themeColor } = props;

  return (
    <div className={cn(alertVariants({ themeColor }), className)} data-slot={'alert'} role={'alert'}>
      {children}
    </div>
  );
};

type AlertTitleProps = Pick<ComponentProps<'div'>, 'children' | 'className'>;

const AlertTitle = (props: AlertTitleProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        'font-subtitle4 group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:hover:text-grayscale-300',
        className
      )}
      data-slot={'alert-title'}
    >
      {children}
    </div>
  );
};

type AlertDescriptionProps = Pick<ComponentProps<'div'>, 'children' | 'className'>;

const AlertDescription = (props: AlertDescriptionProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        'font-body3 text-pretty text-grayscale-400 sm:text-balance [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:hover:text-grayscale-300 [&_p:not(:last-child)]:mb-4',
        className
      )}
      data-slot={'alert-description'}
    >
      {children}
    </div>
  );
};

type AlertActionProps = Pick<ComponentProps<'div'>, 'children' | 'className'>;

const AlertAction = (props: AlertActionProps) => {
  const { children, className } = props;

  return (
    <div className={cn('absolute right-2 top-2', className)} data-slot={'alert-action'}>
      {children}
    </div>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
export type { AlertProps, AlertTitleProps, AlertDescriptionProps, AlertActionProps };
