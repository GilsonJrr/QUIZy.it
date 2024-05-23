import React, { FC } from "react";
import * as Styled from "./styled";
import Logo from "assets/images/Logo.png";

type LoadingImageProps = {};

const LoadingImage: FC<LoadingImageProps> = () => {
  return (
    <Styled.Container>
      <Styled.Loader src={Logo} />
    </Styled.Container>
  );
};

export default LoadingImage;
