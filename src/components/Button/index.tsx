import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "anchor-dark"
    | "anchor-white";
  size?: "small" | "medium" | "big";
  children: ReactNode | ReactNode[];
  radius?: string;
  padding?: string;
  width?: string;
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
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
