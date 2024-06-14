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
  active?: boolean;
  tab?: boolean;
  displayOnActive?: boolean;
};

export const Wrapper = styled.div<Props>`
  position: relative;
  height: ${({ height }) => height || "100%"};
`;

export const TabContainer = styled.div<Props>`
  position: absolute;
  height: ${({ tab }) => (tab ? 6 : 0)}vh;
  width: 100%;
  left: 0;
  top: 1px;
  z-index: 10;
  display: flex;
  gap: 5px;
`;

export const TabContainerMobile = styled.div`
  /* position: absolute; */
  height: 6vh;
  width: 100%;
  left: 0;
  top: 1px;
  z-index: 10;
  display: flex;
  gap: 5px;
`;

export const Tab = styled.div<Props>`
  display: ${({ displayOnActive, active }) =>
    displayOnActive && active ? "flex" : displayOnActive ? "none" : "flex"};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-bottom: ${({ active }) => (active ? "none" : "")};
  background-color: ${({ theme, active }) =>
    active
      ? theme.colors.background.default
      : theme.colors.background.highlight};
  height: 100%;
  z-index: 100000;
  border-radius: 20px 20px 0 0;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  cursor: pointer;
`;

export const Card = styled.div<Props>`
  grid-area: ${({ gridName }) => gridName || ""};
  border-radius: 0px;
  border: none;
  padding: ${({ innerCard }) => (innerCard ? "0px" : "15px")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.highlight};
  height: ${({ height }) => height || "100%"};
  overflow: auto;

  @media screen and (min-width: 900px) {
    border-radius: ${({ tab }) => (tab ? "0 20px 20px 20px" : "20px")};
    border: 1px solid ${({ theme }) => theme.colors.main.default};
    background-color: ${({ theme }) => theme.colors.background.default};
    height: calc(
      ${({ height }) => height || "100%"} - ${({ tab }) => (tab ? 6 : 0)}vh
    );
    margin-top: ${({ tab }) => (tab ? 6 : 0)}vh;

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
