import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";

type CrumbsType = {
  label: string;
  path: string;
  onClick?: () => void;
};

type BreadCrumbsProps = { crumbs: CrumbsType[] };

const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  const navigate = useNavigate();

  const handleClick = (crumb: CrumbsType) => {
    if (crumb.onClick) {
      return crumb.onClick();
    }
    if (crumb.path !== "") {
      navigate(crumb.path);
    }
  };

  return (
    <Styled.Container>
      {crumbs?.map((crumb, index) => {
        return (
          <Styled.CrumbsContainer onClick={() => handleClick(crumb)}>
            <Styled.Crumbs>{crumb.label}</Styled.Crumbs>
            {index !== crumbs.length - 1 && <Styled.Arrows />}
          </Styled.CrumbsContainer>
        );
      })}
    </Styled.Container>
  );
};

export default BreadCrumbs;
