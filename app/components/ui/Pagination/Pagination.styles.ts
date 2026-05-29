import { tv, type VariantProps } from "tailwind-variants";

export const makeNavigationButtonStyle = tv({
  base: [
    "cursor-pointer rounded-full border border-transparent bg-transparent px-4 py-2 text-sm font-medium transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "hover:bg-secondary",
  ],
});

export type MakeNavigationButtonStyle = VariantProps<
  typeof makeNavigationButtonStyle
>;

export const makePageButtonStyle = tv({
  base: "bg-transparent min-w-10 cursor-pointer rounded-full p-2 text-sm font-medium transition-colors",
  variants: {
    isSelected: {
      true: "bg-primary",
      false: "hover:bg-secondary",
    },
  },
});

export type MakePageButtonStyle = VariantProps<typeof makePageButtonStyle>;
