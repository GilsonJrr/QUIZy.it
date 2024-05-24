import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";
import { Title } from "components/ui/Typography/styled";
import LoadingSpinner from "components/LoadingSpiner";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: FieldError | undefined;
  width?: string;
  viewMode?: boolean;
  loading?: boolean;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ label, error, width, viewMode, type = "text", loading, ...rest }, ref) => {
    return (
      <Styled.Container width={width} viewMode={viewMode}>
        <Title size="smaller">{label}</Title>
        {type === "file" ? (
          <>
            {!loading ? (
              <Styled.LabelButton htmlFor="file-upload">
                <Title size="medium" color="light">
                  Choose a file
                </Title>
              </Styled.LabelButton>
            ) : (
              <Styled.LoadingContainer>
                <LoadingSpinner size="small" color="light" />
              </Styled.LoadingContainer>
            )}
            <Styled.Input
              type={type}
              ref={ref}
              id="file-upload"
              {...rest}
              viewMode={viewMode}
              file={type === "file"}
            />
          </>
        ) : (
          <Styled.Input type={type} ref={ref} {...rest} viewMode={viewMode} />
        )}
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default SimpleInput;
