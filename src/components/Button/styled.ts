import { theme } from "lib/styles/globalStyles";
import styled from "styled-components";

type VariantProps =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "anchor-dark"
  | "anchor-white";

type Props = {
  variant?: VariantProps;
  size?: string;
  radius?: string;
  padding?: string;
  width?: string;
  align?: "flex-start" | "center" | "flex-end";
  partialDisabled?: boolean;
};

enum EVariantBackGround {
  primary,
  secondary,
  danger,
  success,
  "anchor-dark",
  "anchor-white",
}

const backgroundColors: string[] = [
  theme.colors.main.default,
  theme.colors.background.default,
  theme.colors.quiz.wrong,
  theme.colors.quiz.right,
  "transparent",
  "transparent",
];

// const backgroundColorsHover: string[] = [
//   theme.colors.main.secondary,
//   theme.colors.background.highlight,
//   theme.colors.quiz.wrong,
//   theme.colors.quiz.right,
//   "transparent",
//   "transparent",
// ];

enum EVariantBorder {
  primary,
  secondary,
  danger,
  "anchor-dark",
  "anchor-white",
}

const borderColors: string[] = [
  theme.colors.main.default,
  theme.colors.main.default,
  theme.colors.quiz.wrong,
  "transparent",
  "transparent",
];

enum EVariantColor {
  primary,
  secondary,
  danger,
  "anchor-dark",
  "anchor-white",
}

const colors: string[] = [
  theme.colors.background.default,
  theme.colors.main.default,
  theme.colors.background.default,
  theme.colors.main.default,
  theme.colors.background.default,
];

export const Button = styled.button<Props>`
  border: 1px solid
    ${({ variant }) =>
      borderColors[EVariantBorder[variant as keyof typeof EVariantBorder]]};
  background-color: ${({ variant }) =>
    backgroundColors[
      EVariantBackGround[variant as keyof typeof EVariantBackGround]
    ]};
  outline: none;
  color: ${({ variant }) =>
    colors[EVariantColor[variant as keyof typeof EVariantColor]]};
  border-radius: ${({ radius }) => radius || "10px"};
  padding: ${({ padding }) => padding || "10px 40px"};
  width: ${({ width }) => width};
  font-size: ${({ size }) => size};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: ${({ align }) => align};
  gap: 5px;

  &:disabled {
    opacity: ${({ partialDisabled }) => (partialDisabled ? "1" : "0.5")};
  }

  transition: 0.2s ease-in-out all;
`;
