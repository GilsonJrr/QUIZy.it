import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";

type CrumbsType = {
  label: string;
  path: string;
};

type BreadCrumbsProps = { crumbs: CrumbsType[] };

const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  const navigate = useNavigate();

  return (
    <Styled.Container>
      {crumbs?.map((crumb, index) => {
        return (
          <Styled.CrumbsContainer
            onClick={() => (crumb.path ? navigate(crumb.path) : null)}
          >
            <Styled.Crumbs>{crumb.label}</Styled.Crumbs>
            {index !== crumbs.length - 1 && <Styled.Arrows />}
          </Styled.CrumbsContainer>
        );
      })}
    </Styled.Container>
  );
};

export default BreadCrumbs;
