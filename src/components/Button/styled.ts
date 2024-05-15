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
};

enum EVariantBackGround {
  "primary" = "#4a4747",
  "secondary" = "#f8f8f8",
  "danger" = "#c78788",
  "success" = "#89c799",
  "anchor-dark" = "transparent",
  "anchor-white" = "transparent",
}

export const Button = styled.button<Props>`
  border: 1px solid
    ${({ variant }) =>
      variant === "primary"
        ? "#4a4747"
        : variant === "secondary"
        ? "#4a4747"
        : variant === "danger"
        ? "#c78788"
        : (variant === "anchor-dark" || variant === "anchor-white") &&
          "transparent"};
  background-color: ${({ variant }) =>
    EVariantBackGround[variant as VariantProps]};
  outline: none;
  color: ${({ variant }) =>
    variant === "primary" || variant === "anchor-white"
      ? "#f8f8f8"
      : variant === "secondary"
      ? "#4a4747"
      : variant === "danger"
      ? "#f8f8f8"
      : variant === "anchor-dark" && "#4a4747"};
  border-radius: ${({ radius }) => radius || "10px"};
  padding: ${({ padding }) => padding || "10px 40px"};
  width: ${({ width }) => width};
  font-size: ${({ size }) => size};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:disabled {
    opacity: 0.5;
  }
`;
