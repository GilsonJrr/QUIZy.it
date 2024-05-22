import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";

export type variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "anchor-dark"
  | "anchor-white";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variant;
  size?: "small" | "medium" | "big";
  children: ReactNode | ReactNode[];
  radius?: string;
  padding?: string;
  width?: string;
  align?: "flex-start" | "center" | "flex-end";
  partialDisabled?: boolean;
}

enum EFontSize {
  "small" = "0.9rem",
  "medium" = "1.3rem",
  "big" = "1.6rem",
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  radius,
  padding,
  width,
  align,
  partialDisabled,
  ...rest
}) => {
  return (
    <Styled.Button
      {...rest}
      variant={variant}
      radius={radius}
      padding={padding}
      width={width}
      size={EFontSize[size]}
      align={align}
      partialDisabled={partialDisabled}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
