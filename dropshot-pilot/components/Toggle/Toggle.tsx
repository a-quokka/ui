import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * shadcn Toggle 의 형태를 그대로 가져왔다 — 높이 M 32 / S 28 / L 36px, 좌우 10px,
 * 아이콘이 붙는 쪽만 여백을 2px 줄인다.
 *
 * 원본과 다르게 한 것 셋:
 *
 * 1. `@base-ui/react/toggle` 프리미티브를 걷어내고 `button` 으로 직접 그린다.
 *    이 프리미티브가 하는 일은 눌림 상태를 들고 `aria-pressed` 를 붙이는 것뿐이고,
 *    드롭샷 `Switch` 도 같은 일을 직접 한다. 집 관례를 따랐다.
 * 2. **제어 컴포넌트로만 만들었다.** `Switch` 와 같다. 상태를 안에 숨기면
 *    소비처에서 초기값을 되돌리기 어려워진다.
 * 3. size 어휘를 드롭샷 `Button` 에 맞춰 `S`·`M`·`L` 로 바꿨다
 *    (원본 `sm`·`default`·`lg`). `XS` 는 원본에 없어 넣지 않았다.
 */
const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-2 font-subtitle4 outline-none transition-all hover:bg-grayscale-800 hover:text-white aria-pressed:bg-grayscale-800 focus-visible:border-primary-400 focus-visible:ring-[3px] focus-visible:ring-primary-400/50 aria-[invalid=true]:border-secondary-red-400 aria-[invalid=true]:ring-secondary-red-400/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        none: 'bg-transparent',
        outline: 'border border-grayscale-700 bg-transparent hover:bg-grayscale-800',
      },
      size: {
        S: "h-7 min-w-7 px-2.5 font-button4 has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        M: 'h-8 min-w-8 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
        L: 'h-9 min-w-9 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2',
      },
    },
    defaultVariants: {
      variant: 'none',
      size: 'M',
    },
  }
);

type ToggleProps = Pick<ComponentProps<'button'>, 'children' | 'className' | 'disabled'> &
  VariantProps<typeof toggleVariants> & {
    pressed: boolean;
    onPressedChange: (pressed: boolean) => void;
  };

const Toggle = (props: ToggleProps) => {
  const { children, className, disabled, pressed, onPressedChange, size, variant } = props;

  return (
    <button
      aria-pressed={pressed}
      className={cn(toggleVariants({ size, variant }), className)}
      data-slot={'toggle'}
      disabled={disabled}
      type={'button'}
      onClick={() => onPressedChange(!pressed)}
    >
      {children}
    </button>
  );
};

export { Toggle, toggleVariants };
export type { ToggleProps };
