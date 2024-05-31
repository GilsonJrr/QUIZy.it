import styled from "styled-components";

//Icon
import { GrUpdate } from "react-icons/gr";

type Props = {
  gridName?: string;
  scrollable?: boolean;
  width?: string;
  innerCard?: boolean;
  justify?: string;
  height?: string;
};

export const Card = styled.div<Props>`
  grid-area: ${({ gridName }) => gridName || ""};
  border-radius: 0px;
  border: none;
  padding: ${({ innerCard }) => (innerCard ? "0px" : "15px 20px")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.highlight};

  height: ${({ height }) => height || "100%"};
  overflow: auto;

  @media screen and (min-width: 900px) {
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.main.default};
    background-color: ${({ theme }) => theme.colors.background.default};

    &::after {
      content: "";
      position: absolute;
      width: ${({ scrollable }) => (scrollable ? "100" : "0")}%;
      height: 50px;
      background: linear-gradient(
        0deg,
        ${({ theme }) => theme.colors.background.default} 20%,
        rgba(255, 255, 255, 0) 100%
      );
      bottom: 0;
      left: 0;
      border-radius: 0 0 20px 20px;
    }
  }
`;

export const CardHeader = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || "space-between"};
  width: 100%;
`;

export const CardInner = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  height: 100%;
  padding-bottom: ${({ scrollable }) => (scrollable ? "80" : "0")}px;
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const UpdateIcon = styled(GrUpdate)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.main.default};
`;
