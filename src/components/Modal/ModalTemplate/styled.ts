import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 100000;

  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 20px 20px 0 0;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
  @media screen and (min-width: 600px) {
    width: auto;
    position: relative;
    border-radius: 20px;
  }
`;
