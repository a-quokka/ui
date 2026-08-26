/**
 * ⚠️ **드롭샷 저장소의 복사본이다. 원본은 여기가 아니다.**
 *
 *   출처  jiro-developers/dropshot
 *         packages/design-system/components/Button/Button.tsx
 *         커밋 04b10f0
 *
 * 이 저장소에서 이식한 컴포넌트들이 이 파일을 import 한다. 없으면 타입 검사도
 * 미리보기 렌더도 되지 않아 내용을 그대로 옮겨 두었다.
 *
 * **고치지 마라. 드롭샷으로 복사해 넣지도 마라.** 원본이 바뀌면 여기를 다시 맞춘다.
 *
 * ! 이 버튼은 `w-full flex-col` 이다 — 부모 폭을 꽉 채우고 자식을 세로로 쌓는다.
 *   줄 안에 놓이는 작은 버튼이 필요하면 같은 폴더의 `InlineButton` 을 쓴다.
 */
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@configs/tailwind';
import Spinner from '../Spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  themeColor: 'white' | 'primary' | 'grayscale800' | 'grayscale900' | 'red' | 'ghost' | 'primaryGradient' | 'blue';
  size: 'XS' | 'S' | 'M' | 'L';
  iconFilter?: boolean;
  transparent?: boolean;
  loading?: boolean;
}

const buttonVariants = cva('relative flex w-full flex-col items-center justify-center rounded-[69px] text-white', {
  variants: {
    themeColor: {
      primary: 'bg-primary-400 hover:bg-primary-500 active:bg-primary-600',
      grayscale800: 'bg-grayscale-800 hover:bg-grayscale-700 active:bg-grayscale-600',
      grayscale900: 'border border-solid border-white bg-grayscale-900 hover:bg-grayscale-800 active:bg-grayscale-700',
      white: 'bg-white text-grayscale-900 hover:bg-grayscale-75 active:bg-grayscale-200 disabled:text-grayscale-400',
      red: 'bg-secondary-red-400 hover:bg-[#EA4855] active:bg-[#ED5F6B]',
      blue: 'bg-secondary-blue-400 hover:bg-secondary-blue-500 active:bg-secondary-blue-600',
      ghost:
        'fine:hover:bg-white fine:hover:text-grayscale-900 border border-solid border-white bg-transparent text-white active:border-transparent active:bg-grayscale-75 active:text-grayscale-900',
      primaryGradient:
        'z-general bg-gradient-to-r from-primary-400 from-0% to-secondary-blue-400 to-100% before:absolute before:inset-0 before:z-back before:hover:bg-black/10 before:active:bg-black/20',
    },
    size: {
      XS: 'font-button3 px-3 py-1.5',
      S: 'font-button3 px-4 py-2',
      M: 'font-button2 px-6 py-2',
      L: 'font-button1 px-8 py-3',
    },
    iconFilter: {
      true: '[&_img]:icon-filter-white',
      false: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    transparent: {
      true: 'border border-solid border-grayscale-500 bg-grayscale-800/[.72]',
      false: '',
    },
    loading: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      loading: false,
      class: '[&_img]:disabled:icon-filter-grayscale400 disabled:cursor-not-allowed disabled:bg-grayscale-600',
    },
    {
      themeColor: ['primary', 'grayscale800', 'red', 'blue'],
      disabled: true,
      loading: false,
      class: 'disabled:text-grayscale-400',
    },
    {
      themeColor: 'grayscale900',
      disabled: true,
      loading: false,
      class: 'disabled:border disabled:border-solid disabled:border-grayscale-300 disabled:text-grayscale-400',
    },
    {
      themeColor: 'ghost',
      disabled: true,
      loading: false,
      class:
        'disabled:border disabled:border-solid disabled:border-grayscale-700 disabled:bg-transparent disabled:text-grayscale-700',
    },
    {
      themeColor: 'primaryGradient',
      disabled: true,
      loading: false,
      class: 'disabled:from-grayscale-600 disabled:to-grayscale-600 disabled:text-grayscale-400 disabled:before:hidden',
    },
  ],
  defaultVariants: { iconFilter: false, loading: false },
});

const Button = ({
  className,
  children,
  size,
  themeColor,
  iconFilter,
  transparent,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ size, themeColor, iconFilter, transparent, disabled, loading, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <div className={'invisible flex w-full opacity-0'}>{children}</div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
