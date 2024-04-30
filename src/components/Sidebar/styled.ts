import styled from "styled-components";

type Props = {
  active?: boolean;
};

export const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7vw;
  z-index: 100;
  position: fixed;
`;

export const MenuContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 20px 0 20px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

export const IconContainer = styled.div<Props>`
  color: ${({ active }) => (active ? "#f8f8f8" : "#b0d9d1")};
  padding: 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#b0d9d1" : "transparent")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out all;

  &:hover {
    background-color: #b0d9d1;
    color: #f8f8f8;
  }
`;

export const ExitContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #996868;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
`;
