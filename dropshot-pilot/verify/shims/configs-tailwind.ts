/**
 * `@configs/tailwind` 흉내 — 타입 검사 전용이다.
 *
 * 이식한 컴포넌트는 드롭샷의 `@configs/tailwind` 에서 `cn` 을 가져온다. 그 패키지는
 * 드롭샷 저장소에만 있어 이 저장소에서는 컴파일이 안 된다. 그래서 **모양만 같은**
 * 대역을 두고 타입 검사를 돌린다.
 *
 * 원본과 같은 구현이다 (configs/tailwind/src/utils/tailwindHelper.ts).
 * 다만 tailwind config 를 resolve 하지 않으므로 `rounded-N` 병합 규칙은 빠져 있다.
 * 타입만 보는 자리라 문제되지 않는다.
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
