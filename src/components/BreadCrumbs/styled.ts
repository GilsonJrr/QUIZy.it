import styled from "styled-components";
import { FiChevronsRight } from "react-icons/fi";
import { Title } from "components/ui/Typography/styled";

type Props = {
  showFade?: boolean;
};

export const Arrows = styled(FiChevronsRight)`
  display: flex;
`;

export const Container = styled.div<Props>`
  display: flex;
  gap: 5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 10%;
    height: ${({ showFade }) => (showFade ? 30 : 0)}px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background.highlight} 20%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    left: 0;
  }

  @media screen and (min-width: 600px) {
    &::after {
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.background.default} 20%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

export const CrumbsContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  ${Title} {
    &:last-child {
      text-decoration: underline;
    }
  }
`;
