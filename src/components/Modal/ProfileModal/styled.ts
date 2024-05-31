import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa6";

type Props = { editMode?: boolean };

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: relative;
  right: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.15);
  @media screen and (min-width: 900px) {
    position: absolute;
    z-index: 100000;
  }
`;

export const Content = styled.div<Props>`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.highlight};
  @media screen and (min-width: 900px) {
    background-color: ${({ theme }) => theme.colors.background.default};
    border-left: 1px solid ${({ theme }) => theme.colors.main.default};
    width: 100vw;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    padding: 30px 40px 30px;
    width: 30vw;
    position: absolute;
    z-index: 100000;
  }
`;

export const ChevronRight = styled(FaChevronRight)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.main.default};
`;

export const IconContainer = styled.div`
  display: none;
  @media screen and (min-width: 900px) {
    display: block;
  }
`;

export const AvatarContainer = styled.div<Props>`
  margin: ${({ editMode }) => (editMode ? "" : "10px 0 20px")};
  position: relative;
`;

export const ProfileEditContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Spacer = styled.div<Props>`
  border-top: ${({ editMode }) => (editMode ? 0 : 1)}px solid
    ${({ theme }) => theme.colors.main.default};
  width: 100%;
`;

export const ButtonContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin: 0 5%;
  position: absolute;
  right: 0;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;
