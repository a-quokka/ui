import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';

/**
 * **비교용이다. 이 파일을 드롭샷에 그대로 넣지 마라.**
 *
 * 드롭샷 `Switch` 에 shadcn 의 크기를 입히면 어떻게 되는지 보려고 만들었다.
 * 차이는 `../COMPARE.md` 에 정리했다.
 *
 * ! **켜짐 색이 다르다.** 드롭샷은 `secondary-blue-400`, shadcn 은 primary 다.
 *   여기서는 드롭샷 색을 지켰다. 스위치가 파란 것은 드롭샷의 선택이고 색은
 *   가져올 대상이 아니다.
 *
 * ! shadcn 은 크기를 둘 두었다(default·sm). 드롭샷은 하나뿐이다. 어휘를 맞춰
 *   `M`·`S` 로 옮겼다. 드롭샷 원래 크기는 40×20 으로 여기 `M`(32×18.4)보다 크다.
 *
 * ! 프리미티브(@base-ui/react/switch)는 걷어냈다. 드롭샷 원본이 이미
 *   `input[type=checkbox][role=switch]` 로 직접 그리고 있어 관례를 따랐다.
 */
const switchTrackVariants = cva(
  'absolute inset-0 rounded-full border border-transparent transition-colors duration-200',
  {
    variants: {
      size: {
        S: '',
        M: '',
      },
      checked: {
        true: 'bg-secondary-blue-400',
        false: 'bg-grayscale-700',
      },
    },
    defaultVariants: { size: 'M', checked: false },
  }
);

const switchRootVariants = cva('relative inline-block cursor-pointer', {
  variants: {
    size: {
      // shadcn default — 32 × 18.4
      M: 'h-[18.4px] w-8',
      // shadcn sm — 24 × 14
      S: 'h-[14px] w-6',
    },
  },
  defaultVariants: { size: 'M' },
});

const switchThumbVariants = cva(
  'absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-200',
  {
    variants: {
      size: {
        M: 'size-4',
        S: 'size-3',
      },
      checked: {
        true: 'translate-x-[calc(100%-2px)]',
        false: 'translate-x-0.5',
      },
    },
    defaultVariants: { size: 'M', checked: false },
  }
);

type SwitchProps = Pick<ComponentProps<'label'>, 'className'> &
  VariantProps<typeof switchRootVariants> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    checkedWrapperClassName?: string;
  };

const Switch = (props: SwitchProps) => {
  const { checked = false, checkedWrapperClassName, className, onChange, size } = props;

  return (
    <label className={cn(switchRootVariants({ size }), className)}>
      <input
        aria-checked={checked}
        checked={checked}
        className={'peer sr-only'}
        role={'switch'}
        type={'checkbox'}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <div className={cn(switchTrackVariants({ checked, size }), checkedWrapperClassName)} />
      <div className={cn(switchThumbVariants({ checked, size }))} />
    </label>
  );
};

export { Switch, switchRootVariants };
export type { SwitchProps };
