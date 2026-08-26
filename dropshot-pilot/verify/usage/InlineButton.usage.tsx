/**
 * `InlineButton` 이 실제 호출 방식을 견디는지 보는 파일이다.
 *
 * 내보낸 52개 중 14곳이 shadcn `Button` 을 쓴다. 그 호출 패턴을 그대로 옮겨 적고
 * 타입 검사로 확인한다. 화면에 그리는 파일이 아니다.
 *
 * 원본 호출은 `dropshot-export/MERGE-REQUIRED.md` 의 Button 절에 정리돼 있다.
 */
import { cn } from '@configs/tailwind';
import { InlineButton, inlineButtonVariants } from '../../components/Button/InlineButton';

/** Sidebar — 사이드바 토글. `<Button variant="ghost" size="icon-sm" data-sidebar="trigger" />` */
export const SidebarTrigger = ({ onClick }: { onClick: () => void }) => (
  <InlineButton data-sidebar={'trigger'} iconOnly size={'S'} themeColor={'ghost'} onClick={onClick}>
    <span aria-hidden>≡</span>
  </InlineButton>
);

/** Carousel — 화살표. `disabled={!canScrollPrev}` 를 넘긴다 */
export const CarouselPrevious = ({
  canScrollPrev,
  scrollPrev,
}: {
  canScrollPrev: boolean;
  scrollPrev: () => void;
}) => (
  <InlineButton
    data-slot={'carousel-previous'}
    disabled={!canScrollPrev}
    iconOnly
    size={'XS'}
    themeColor={'outline'}
    onClick={scrollPrev}
  >
    <span aria-hidden>←</span>
  </InlineButton>
);

/** AlertDialog — 확인·취소. 변형을 그대로 흘려보낸다 */
export const AlertDialogAction = ({
  size,
  themeColor,
  children,
}: {
  size?: 'XS' | 'S' | 'M' | 'L';
  themeColor?: 'primary' | 'red' | 'ghost' | 'outline';
  children: React.ReactNode;
}) => (
  <InlineButton data-slot={'alert-dialog-action'} size={size} themeColor={themeColor}>
    {children}
  </InlineButton>
);

/** InputGroup — 입력 칸 안의 작은 버튼. `size="icon-xs"` 자리 */
export const InputGroupButton = ({ children }: { children: React.ReactNode }) => (
  <InlineButton iconOnly size={'XS'} themeColor={'ghost'}>
    {children}
  </InlineButton>
);

/**
 * Pagination — 버튼 모양의 **링크**.
 * 원본은 `<Button nativeButton={false} render={<a … />} />` 였다.
 * 프리미티브를 걷어냈으므로 변형 함수를 링크에 직접 씌운다.
 */
export const PaginationLink = ({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      inlineButtonVariants({ iconOnly: true, size: 'M', themeColor: isActive ? 'outline' : 'ghost' })
    )}
    data-active={isActive}
    data-slot={'pagination-link'}
    href={href}
  >
    {children}
  </a>
);

/** Questionnaire — 제출 버튼. 폼 안이라 `type="submit"` 을 넘긴다 */
export const QuestionnaireSubmit = ({ children }: { children: React.ReactNode }) => (
  <InlineButton size={'M'} themeColor={'primary'} type={'submit'}>
    {children}
  </InlineButton>
);

/** Calendar — 날짜 칸. 임의의 `data-*` 를 여러 개 붙인다 */
export const CalendarDay = ({
  isRangeStart,
  isRangeEnd,
  children,
}: {
  isRangeStart: boolean;
  isRangeEnd: boolean;
  children: React.ReactNode;
}) => (
  <InlineButton
    data-day
    data-range-end={isRangeEnd}
    data-range-start={isRangeStart}
    iconOnly
    size={'S'}
    themeColor={'ghost'}
  >
    {children}
  </InlineButton>
);
