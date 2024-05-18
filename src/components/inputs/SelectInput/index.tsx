import React, { forwardRef, SelectHTMLAttributes } from "react";
import * as Styled from "./styled";
import { TOption } from "types/index";
import { FieldError } from "react-hook-form";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: TOption[];
  width?: string;
  error?: FieldError | undefined;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, error, options, width, ...rest }, ref) => {
    return (
      <Styled.Container width={width}>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Select ref={ref} {...rest}>
          {options.map((option) => (
            <Styled.Option key={option.value} value={option.value}>
              {option.label}
            </Styled.Option>
          ))}
        </Styled.Select>
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default SelectInput;
