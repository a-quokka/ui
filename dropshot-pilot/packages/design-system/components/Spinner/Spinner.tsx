/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Spinner/Spinner.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 */
import React from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@configs/tailwind';

type SpinnerProps = Pick<HTMLAttributes<HTMLElement>, 'className'> & {
  size?: string;
  color?: string;
  speed?: string;
  strokeWidth?: string;
  delay?: number;
};

const Spinner = ({
  className,
  size = '20px',
  color = '#9c9c9c',
  speed = '0.9s',
  strokeWidth = '2px',
  delay = 0,
}: SpinnerProps) => {
  return (
    <div
      className="animate-delayEffect"
      style={{ opacity: 0, animation: `delayEffect 0s linear ${delay}s forwards` }}
    >
      <div
        role="status"
        className={cn('relative flex transform-none animate-spin items-center rounded-full', className)}
        style={
          {
            '--size': size,
            '--color': color,
            '--speed': speed,
            '--stroke-width': strokeWidth,
            '--mask-size': 'calc(var(--size) / 2 - var(--stroke-width))',
            width: size,
            height: size,
            mask: 'radial-gradient(circle var(--mask-size), transparent 99%, #000 100%)',
            backgroundImage: 'conic-gradient(transparent 25%, var(--color))',
            animation: 'spin calc(var(--speed)) linear infinite',
          } as CSSProperties
        }
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

export { type SpinnerProps };
