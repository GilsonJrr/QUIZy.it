import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styled";
import { FieldError } from "react-hook-form";
import { Title } from "components/ui/Typography/styled";
import LoadingSpinner from "components/LoadingSpiner";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: FieldError | undefined;
  width?: string;
  viewMode?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, width, viewMode, loading, iconOnly, ...rest }, ref) => {
    return (
      <Styled.Container width={width} viewMode={viewMode}>
        <Title size="smaller">{label}</Title>
        {iconOnly ? (
          <Styled.IconButton htmlFor="file-upload">
            {loading ? (
              <LoadingSpinner size="smaller" color="light" />
            ) : (
              <Styled.Camera />
            )}
          </Styled.IconButton>
        ) : (
          <Styled.LabelButton htmlFor="file-upload">
            {loading ? (
              <LoadingSpinner size="small" color="light" />
            ) : (
              <Title size="medium" color="light">
                Choose a file
              </Title>
            )}
          </Styled.LabelButton>
        )}
        <Styled.Input
          type="file"
          ref={ref}
          id="file-upload"
          {...rest}
          viewMode={viewMode}
          file={true}
        />
        {error && <Styled.Error>{error.message}</Styled.Error>}
      </Styled.Container>
    );
  }
);

export default FileInput;
