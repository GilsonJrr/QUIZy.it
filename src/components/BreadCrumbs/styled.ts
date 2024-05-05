import styled from "styled-components";
import { FiChevronsRight } from "react-icons/fi";

type Props = {};

export const Arrows = styled(FiChevronsRight)`
  display: flex;
`;

export const Container = styled.div<Props>`
  display: flex;
  gap: 5px;
`;

export const Crumbs = styled.h3`
  cursor: pointer;
`;

export const CrumbsContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  ${Crumbs} {
    &:last-child {
      text-decoration: underline;
    }
  }
`;
