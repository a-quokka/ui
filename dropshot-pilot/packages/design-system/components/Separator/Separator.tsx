import type { ComponentProps } from 'react';
import { cn } from '@configs/tailwind';

/**
 * shadcn Separator 의 형태를 그대로 가져왔다 — 가로는 높이 1px 에 폭 100%,
 * 세로는 폭 1px 에 부모 높이만큼 늘어난다.
 *
 * 원본과 다르게 한 것 둘:
 *
 * 1. `@base-ui/react/separator` 프리미티브를 걷어내고 평범한 `div` 로 그린다.
 *    이 컴포넌트가 프리미티브에서 얻는 것은 `role="separator"` 와
 *    `aria-orientation` 뿐이라 직접 붙이면 의존성이 필요 없다.
 * 2. `data-horizontal:` 같은 v4 전용 축약 변형 대신 v3 문법인
 *    `data-[orientation=horizontal]:` 을 쓴다.
 */
type SeparatorProps = Pick<ComponentProps<'div'>, 'className'> & {
  orientation?: 'horizontal' | 'vertical';
  /** 화면에만 보이는 장식선이면 `true`. 보조기술이 건너뛴다. */
  decorative?: boolean;
};

const Separator = (props: SeparatorProps) => {
  const { className, orientation = 'horizontal', decorative = false } = props;

  return (
    <div
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-grayscale-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        className
      )}
      data-orientation={orientation}
      data-slot={'separator'}
      role={decorative ? 'none' : 'separator'}
    />
  );
};

export { Separator };
export type { SeparatorProps };
