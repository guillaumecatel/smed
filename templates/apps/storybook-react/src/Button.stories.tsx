import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './Button'

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: 'Click me',
    disabled: false,
  },
}
