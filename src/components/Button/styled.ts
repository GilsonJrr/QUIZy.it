import styled from "styled-components";

type VariantProps =
  | "primary" // colors.background.secondary
  | "secondary" // colors.background.default
  | "danger" // colors.alert.error
  | "success" // colors.alert.success
  | "anchor-dark" // transparent
  | "anchor-white"; // transparent

type Props = {
  variant: VariantProps;
  size?: string;
  radius?: string;
  padding?: string;
  width?: string;
  align?: "flex-start" | "center" | "flex-end";
  partialDisabled?: boolean;
};

enum EColor {
  primary = "light",
  secondary = "default",
  danger = "light",
  success = "light",
  "anchor-dark" = "default",
  "anchor-white" = "light",
}

export const Button = styled.button<Props>`
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "anchor-dark" || variant === "anchor-white"
        ? "transparent"
        : theme.colors.button.default};
  background-color: ${({ theme, variant }) => theme.colors.button[variant]};
  outline: none;
  color: ${({ variant, theme }) => theme.colors.text[EColor[variant]]};
  border-radius: ${({ radius }) => radius || "10px"};
  padding: ${({ padding }) => padding || "10px 40px"};
  width: ${({ width }) => width};
  font-size: ${({ size }) => size};
  font-weight: 600;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: ${({ align }) => align};
  gap: 5px;

  &:disabled {
    opacity: ${({ partialDisabled }) => (partialDisabled ? "1" : "0.5")};
  }

  &:hover {
    filter: brightness(
      ${({ variant }) =>
        variant === "danger" ? 1.1 : variant === "secondary" ? 0.91 : 1.2}
    );
  }

  transition: 0.2s ease-in-out all;
`;
