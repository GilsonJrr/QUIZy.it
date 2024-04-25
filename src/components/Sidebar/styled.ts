import styled from "styled-components";

type Props = {
  active?: boolean;
};

export const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  z-index: 100;
  position: fixed;
`;

export const LogoContainer = styled.div`
  height: 10%;
  width: 100%;
  background-color: #f8f8f8;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const MenuContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 0 0 0;
`;

export const IconContainer = styled.div<Props>`
  color: ${({ active }) => (active ? "#f8f8f8" : "#b0d9d1")};
  padding: 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#b0d9d1" : "transparent")};
  border-radius: 100%;
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
  height: 20%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
  color: #996868;
`;
