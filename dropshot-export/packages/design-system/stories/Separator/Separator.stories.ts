import Separator from '@ds-dropshot/components/Separator/Separator';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;
export default meta;

type Story = StoryObj<typeof meta>;

// ! args 는 비어 있다. 컴포넌트마다 필수 prop 이 달라 자동으로 채우지 않았다.
export const Default = {
  args: {},
} satisfies Story;
