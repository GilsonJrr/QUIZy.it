import styled from "styled-components";

type Props = {
  active?: boolean;
  exit?: boolean;
  showMenu?: boolean;
};

export const Container = styled.div<Props>`
  display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
  background-color: ${({ theme }) => theme.colors.background.default};
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 100;
  position: relative;
  bottom: 0;
  @media screen and (min-width: 600px) {
    display: flex;
    width: 6%;
  }
`;

export const ContainerBackGround = styled.div<Props>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.default};
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  @media screen and (min-width: 600px) {
    background-color: transparent;
  }
`;

export const MenuContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  height: auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  @media screen and (min-width: 600px) {
    height: 90%;
  }
`;

export const IconContainer = styled.div<Props>`
  color: ${({ active, theme }) =>
    active ? theme.colors.background.default : theme.colors.main.default};
  padding: 15px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.main.default : "transparent"};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: 0.3s ease-in-out all;
  gap: 20px;
  width: 100%;
  z-index: 10;
  &:hover {
    background-color: ${({ theme }) => theme.colors.main.default};
    color: ${({ theme }) => theme.colors.background.default};
  }

  @media screen and (min-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

export const MenuText = styled.h2<Props>`
  display: flex;
  margin: 0;
  font-size: 1.3rem;
  color: ${({ active, exit, theme }) =>
    active
      ? theme.colors.background.default
      : exit && theme.colors.quiz.wrongSecondary};
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const ExitContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.quiz.wrongSecondary};
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  padding: 35px;
  background-color: ${({ theme }) => theme.colors.background.default};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  @media screen and (min-width: 600px) {
    padding: 0;
    align-items: center;
    justify-content: center;
  }
`;

export const SideBarToolTipOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 150px;
  gap: 10px;
  padding: 10px;
`;

export const SideBarOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  padding: 20px 0;
  border-radius: 10px;
  gap: 10px;
  font-weight: 600;
`;
