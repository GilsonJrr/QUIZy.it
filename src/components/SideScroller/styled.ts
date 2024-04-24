import styled from "styled-components";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  side?: "left" | "right";
  show?: boolean;
  navigated?: boolean;
  displayQuantity?: number;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 50px 0;
  background-color: #f5f6fa;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
  margin: 50px 0 0 0;
`;

export const SideScroller = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  gap: 20px;
  position: relative;
  padding: 0 10px;
`;

export const ScrollerItem = styled.div<Props>`
  width: calc(100% / ${({ displayQuantity }) => displayQuantity || 5});
  height: 100%;
  background-color: #ffffff;
  margin-bottom: 20px;
  &:hover {
    transition: 0.3s ease-in-out all;
    transform: scale(1.45);
    z-index: 1000;
  }
`;

export const ArrowLeft = styled(FaChevronLeft)`
  display: none;
`;

export const ArrowRight = styled(FaChevronRight)`
  display: none;
`;

export const ScrollButtons = styled.div<Props>`
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  position: absolute;
  left: ${({ side }) => (side === "left" ? "0" : "auto")};
  right: ${({ side }) => (side === "right" ? "0" : "auto")};
  height: 102%;
  width: 200px;
  background: linear-gradient(
    ${({ side }) => (side === "left" ? "90deg" : "270deg")},
    rgba(255, 255, 255) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  align-items: center;
  justify-content: ${({ side }) => (side === "left" ? "0" : "right")};
  cursor: pointer;

  &:hover {
    ${ArrowLeft} {
      display: block;
    }
    ${ArrowRight} {
      display: block;
    }
  }
`;

export const LeftItemsContainer = styled.div``;

export const CentralItemsContainer = styled.div<Props>`
  display: flex;
  width: calc(100% + 400px);
  gap: 20px;
  margin: ${({ navigated }) => (navigated ? "0 -200px" : "0 -200px 0 100px")};
  box-sizing: border-box;
`;

export const Title = styled.div`
  position: absolute;
  left: 100px;
  top: 0;
  display: inline-block;
`;
