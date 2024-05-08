import React, { FC } from "react";
import * as Styled from "./styled";

type LoadingSpinnerProps = {};

const LoadingSpinner: FC<LoadingSpinnerProps> = () => {
  return (
    <Styled.Container>
      <Styled.Spinner />
    </Styled.Container>
  );
};

export default LoadingSpinner;
