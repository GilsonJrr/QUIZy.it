import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";
import { Title } from "components/ui/Typography/styled";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: FieldError | undefined;
  width?: string;
  viewMode?: boolean;
  loading?: boolean;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ label, error, width, viewMode, loading, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Styled.Container width={width} viewMode={viewMode}>
        <Title size="smaller">{label}</Title>
        <Styled.InputWrapper ref={ref}>
          <Styled.Input
            ref={ref}
            {...rest}
            type={showPassword ? "text" : "password"}
          />
          <Styled.IconContainer onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Styled.OpenEye size={30} />
            ) : (
              <Styled.ClosedEye size={30} />
            )}
          </Styled.IconContainer>
        </Styled.InputWrapper>
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default SimpleInput;
