import React, { forwardRef, ReactNode, TextareaHTMLAttributes } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string | ReactNode;
  height?: string;
  error?: FieldError | undefined;
  width?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, error, height, width, ...rest }, ref) => {
    return (
      <Styled.Container width={width}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Textarea ref={ref} {...rest} height={height} />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default TextAreaInput;
