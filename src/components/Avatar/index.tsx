import React, { FC } from "react";
import * as Styled from "./styled";

type AvatarProps = {
  size?: "small" | "medium" | "big" | "bigger";
  name?: string;
  photo?: string;
  border?: string;
  onClick?: () => void;
};

enum ESize {
  "small" = "30px",
  "medium" = "60px",
  "big" = "120px",
  "bigger" = "170px",
}

enum ENameSize {
  "small" = "0.7rem",
  "medium" = "1.7rem",
  "big" = "2.78rem",
  "bigger" = "4.7rem",
}

const Avatar: FC<AvatarProps> = ({
  size = "medium",
  name,
  photo,
  border,
  onClick,
}) => {
  const handleSplitName = () => {
    const splitName = name?.split(" ");

    if (splitName?.length === 1) {
      return name?.slice(0, 2).toUpperCase();
    } else {
      return `${splitName?.[0].slice(0, 1).toUpperCase()}${splitName?.[1]
        .slice(0, 1)
        .toUpperCase()}`;
    }
  };

  if (photo) {
    return (
      <Styled.Photo
        src={photo}
        size={ESize[size as keyof typeof ESize]}
        onClick={onClick}
      />
    );
  }

  return (
    <Styled.Container
      size={ESize[size as keyof typeof ESize]}
      onClick={onClick}
      border={border}
    >
      <Styled.Name size={ENameSize[size as keyof typeof ENameSize]}>
        {handleSplitName()}
      </Styled.Name>
    </Styled.Container>
  );
};

export default Avatar;
