import styled from "styled-components";

type Props = {
  gridName?: string;
  scrollable?: boolean;
  width?: number;
};

export const Card = styled.div<Props>`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 15px 20px;
  grid-area: ${({ gridName }) => gridName};
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  transition: 0.3s ease-in-out all;
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #888;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: ${({ scrollable }) => (scrollable ? "100" : "0")}%;
    height: 50px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h1`
  font-size: 1.4rem;
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  height: 100%;
  padding-bottom: 50px;
`;

export const EmptyListMessage = styled.h2`
  margin: auto;
  text-align: center;
  width: 50%;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const RedirectButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  gap: 6px;
  cursor: pointer;
`;
