import styled from "styled-components";

type Props = {
  gridName?: string;
  scrollable?: boolean;
  width?: string;
  innerCard?: boolean;
  justify?: string;
};

export const Card = styled.div<Props>`
  border-radius: 0px;
  border: none;
  padding: ${({ innerCard }) => (innerCard ? "0px" : "15px 20px")};
  grid-area: ${({ gridName }) => gridName};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.default};

  height: 100vh;
  overflow: auto;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.main.default};
    }
  }

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

  @media screen and (min-width: 600px) {
    border-radius: 20px;
    transition: 0.3s ease-in-out all;
    border: 1px solid ${({ theme }) => theme.colors.main.default};
    height: 100%;
  }
`;

export const CardHeader = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || "space-between"};
  width: 100%;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h1`
  font-size: 1.4rem;
`;

export const CardInner = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  height: 100%;
  padding-bottom: ${({ scrollable }) => (scrollable ? "150" : "0")}px;
`;

export const EmptyListMessage = styled.h2`
  margin: auto;
  text-align: center;
  width: 50%;
  font-size: 1.1rem;
  font-weight: 500;
`;
