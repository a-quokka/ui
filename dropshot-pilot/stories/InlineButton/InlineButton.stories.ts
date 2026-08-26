import { InlineButton } from '@ds-dropshot/components/Button/InlineButton';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'components/InlineButton',
  component: InlineButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: '버튼',
    size: 'M',
    themeColor: 'ghost',
    iconOnly: false,
    disabled: false,
  },
  argTypes: {
    themeColor: {
      control: 'select',
      options: ['primary', 'grayscale800', 'white', 'red', 'blue', 'outline', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['XS', 'S', 'M', 'L'] },
    iconOnly: { control: 'boolean' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InlineButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: { children: '버튼' },
} satisfies Story;

/** 드롭샷 `Button` 과 달리 부모 폭을 채우지 않는다. 줄 안에 놓이는 자리를 위한 것이다. */
export const Primary = {
  args: { children: '확인', themeColor: 'primary' },
} satisfies Story;

export const Outline = {
  args: { children: '취소', themeColor: 'outline' },
} satisfies Story;

/** 사이드바 토글·캐러셀 화살표처럼 아이콘 하나만 넣는 자리. 정사각형이 된다. */
export const IconOnly = {
  args: { children: '≡', iconOnly: true, size: 'S', themeColor: 'ghost' },
} satisfies Story;

export const Disabled = {
  args: { children: '보낼 수 없음', disabled: true, themeColor: 'primary' },
} satisfies Story;
