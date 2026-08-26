/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Switch/Switch.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 */
import { cn } from '@configs/tailwind';

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  checkedWrapperClassName?: string;
  className?: string;
};

const Switch = (props: SwitchProps) => {
  const { checked = false, onChange, checkedWrapperClassName, className } = props;

  return (
    <label className={cn('relative inline-block h-5 w-10 cursor-pointer', className)}>
      <input
        aria-checked={checked}
        checked={checked}
        className={'peer sr-only'}
        role={'switch'}
        type={'checkbox'}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <div
        className={cn(
          'absolute inset-0 rounded-full transition-colors duration-200',
          checked ? 'bg-secondary-blue-400' : 'bg-grayscale-700',
          checkedWrapperClassName
        )}
      />
      <div
        className={cn(
          'absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </label>
  );
};

export { Switch };
export type { SwitchProps };
