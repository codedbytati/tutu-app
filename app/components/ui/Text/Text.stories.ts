import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from "./Text";

const meta = {
  title: "UI/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typography primitive for consistent text styling with semantic HTML by default. Heading appearances render as h1/h2/h3 tags, while body and microtext render as paragraph/small text. Use as to override when needed.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    appearance: {
      control: "inline-radio",
      options: ["h1", "h2", "h3", "body1", "body2", "microtext"],
      description: "Typographic style variant applied by tailwind-variants.",
      table: {
        defaultValue: { summary: "body1" },
      },
    },
    children: {
      control: "text",
      description: "Text content rendered inside the component.",
    },
    as: {
      control: "select",
      options: [undefined, "h1", "h2", "h3", "p", "small", "span", "strong"],
      description:
        "Optional semantic HTML element override. Defaults to the element mapped by appearance.",
    },
    className: {
      control: "text",
      description:
        "Optional extra Tailwind classes merged with the selected variant.",
    },
  },
  args: {
    appearance: "body1",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    appearance: "h1",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const H2: Story = {
  args: {
    appearance: "h2",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const H3: Story = {
  args: {
    appearance: "h3",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const Body1: Story = {
  args: {
    appearance: "body1",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const Body2: Story = {
  args: {
    appearance: "body2",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const Microtext: Story = {
  args: {
    appearance: "microtext",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};
