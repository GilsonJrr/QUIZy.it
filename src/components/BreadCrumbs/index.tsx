import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";
import { Title } from "components/ui/Typography/styled";

type CrumbsType = {
  label: string;
  path: string;
  onClick?: () => void;
};

type BreadCrumbsProps = { crumbs: CrumbsType[] };

const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const handleClick = (crumb: CrumbsType) => {
    if (crumb.onClick) {
      return crumb.onClick();
    }
    if (crumb.path !== "") {
      navigate(crumb.path);
    }
  };

  const mobileCrumbs = crumbs.slice(-3);

  return (
    <Styled.Container showFade={isMobile && mobileCrumbs.length >= 3}>
      {(isMobile ? mobileCrumbs : crumbs).map((crumb, index) => {
        return (
          <Styled.CrumbsContainer onClick={() => handleClick(crumb)}>
            <Title>
              {isMobile && index === crumbs.length - 3
                ? crumb.label.slice(-3)
                : crumb.label}
            </Title>
            {index !== crumbs.length - 1 && <Styled.Arrows />}
          </Styled.CrumbsContainer>
        );
      })}
    </Styled.Container>
  );
};

export default BreadCrumbs;
