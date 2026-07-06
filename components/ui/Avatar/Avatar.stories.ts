import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component for displaying user profile images. Supports multiple sizes with responsive image handling via Next.js Image optimization.',
      },
    },
  },
  tags: ['autodocs', 'test'],
  argTypes: {
    photoToken: {
      control: 'text',
      description: 'URL or token for the avatar image source.',
    },
    title: {
      control: 'text',
      description: 'Alt text and title for the avatar image.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size variant.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    photoToken: 'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Eliza',
    title: 'User Avatar',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Small Avatar',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Medium Avatar',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large Avatar',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    title: 'Extra Large Avatar',
  },

};