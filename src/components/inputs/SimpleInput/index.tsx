import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
  error?: FieldError | undefined;
  width?: string;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ label, error, width, ...rest }, ref) => {
    return (
      <Styled.Container width={width}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Input type="text" ref={ref} {...rest} />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default SimpleInput;
