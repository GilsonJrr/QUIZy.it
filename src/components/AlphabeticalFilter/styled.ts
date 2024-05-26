import styled from "styled-components";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";

type Props = {};

export const Container = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AToZ = styled(FaSortAlphaDown)``;

export const ZToA = styled(FaSortAlphaUpAlt)``;
