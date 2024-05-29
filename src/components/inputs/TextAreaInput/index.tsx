import React, { forwardRef, ReactNode, TextareaHTMLAttributes } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";
import { Title } from "components/ui/Typography/styled";

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | ReactNode;
  height?: string;
  error?: FieldError | undefined;
  width?: string;
  size?: "smaller" | "small" | "medium" | "big" | "bigger";
}

enum ETypeSize {
  "smaller" = "0.8rem",
  "small" = "1.1rem",
  "medium" = "1.3rem",
  "big" = "1.7rem",
  "bigger" = "1.9rem",
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, error, height, width, size = "medium", ...rest }, ref) => {
    return (
      <Styled.Container width={width}>
        <Title size="smaller">{label}</Title>
        <Styled.Textarea
          ref={ref}
          {...rest}
          height={height}
          fontSize={ETypeSize[size]}
        />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default TextAreaInput;
