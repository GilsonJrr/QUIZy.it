import React, { forwardRef, TextareaHTMLAttributes } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  height?: string;
  error?: FieldError | undefined;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, error, height, ...rest }, ref) => {
    return (
      <Styled.Container>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Textarea ref={ref} {...rest} height={height} />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default TextAreaInput;
