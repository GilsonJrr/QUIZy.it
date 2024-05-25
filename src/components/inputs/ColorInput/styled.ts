import styled from "styled-components";

type Props = { display?: boolean; color?: string };

export const Container = styled.div<Props>`
  position: relative;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

export const PickerContainer = styled.div<Props>`
  display: ${({ display }) => (display ? "flex" : "none")};
  position: absolute;
  z-index: 1000;
  top: 100%;
  margin-top: 14px;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 0 auto;
`;

export const CurrentColor = styled.div<Props>`
  background-color: ${({ color }) => color};
  height: 25px;
  width: 25px;
  border-radius: 100%;
  margin: 0 0 0 10px;
`;
