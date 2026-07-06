import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { Modal } from "./Modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog component built on Headless UI. Displays overlay content with customizable title, content, and action buttons.",
      },
    },
  },
  tags: ["autodocs", "test"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the modal is displayed.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: "text",
      description: "The heading text displayed at the top of the modal.",
    },
    children: {
      description: "The content displayed in the modal body.",
    },
    primaryButtonLabel: {
      control: "text",
      description: "Label for the primary (dark) action button.",
    },
    secondaryButtonLabel: {
      control: "text",
      description: "Label for the secondary (light) action button.",
    },
    onClose: {
      action: "closed",
      description:
        "Triggered when the modal backdrop is clicked or dialog is closed.",
    },
    onPrimaryButtonClick: {
      action: "primary button clicked",
      description: "Triggered when the primary button is clicked.",
    },
    onSecondaryButtonClick: {
      action: "secondary button clicked",
      description: "Triggered when the secondary button is clicked.",
    },
  },
  args: {
    open: true,
    title: "Confirm Action",
    children: "Are you sure you want to proceed?",
    primaryButtonLabel: "Continue",
    secondaryButtonLabel: "Cancel",
    onClose: fn(),
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Modal Title",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel mattis mauris. In hac habitasse.",
    primaryButtonLabel: "Confirm",
    secondaryButtonLabel: "Cancel",
  },
};
