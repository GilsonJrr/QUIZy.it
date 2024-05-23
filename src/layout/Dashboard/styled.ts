import styled, { css, keyframes } from "styled-components";

import { IoMdMail } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
  open?: boolean;
  triggerAnimation?: boolean;
};

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.highlight};
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.div`
  display: none;
  height: 8%;
  @media screen and (min-width: 600px) {
    display: flex;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

const popUp = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const popOut = keyframes`
  0%{
      opacity: 1;
    }
  100%{
    opacity: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 92%;
  flex-direction: column;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const ChildrenContainer = styled.div<Props>`
  padding: 15px;
  height: calc(100vh - 9vh);
  @media screen and (min-width: 600px) {
    width: 94%;
    padding: 20px 40px;
    ${({ triggerAnimation }) =>
      triggerAnimation
        ? css`
            animation: ${popOut} 0.4s linear;
          `
        : css`
            animation: ${popUp} 0.4s linear;
          `}
  }
`;

export const HeaderMobile = styled.div`
  display: flex;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
  height: 6vh;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  cursor: pointer;
  width: 20%;
  @media screen and (min-width: 600px) {
    width: 6%;
    padding: 10px 15px;
  }
`;

export const Logo = styled.img`
  width: 50%;
  @media screen and (min-width: 600px) {
    width: 80%;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-left: none;
  padding: 10px 20px;
  @media screen and (min-width: 600px) {
    width: 64%;
    justify-content: space-between;
  }
`;

export const HeaderHamburgerMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 5vw; */
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-left: none;
  padding: 10px 20px;
  width: 20%;
`;

export const HeaderMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-left: none;
  padding: 10px 20px;
  width: 5%;
`;

export const AlertContainer = styled.div`
  position: relative;

  transition: 0.2s ease-in-out all;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Mail = styled(IoMdMail)``;

export const Alert = styled(HiBellAlert)``;

export const AlertTag = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: yellow;
  position: absolute;
  top: -7px;
  right: -7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.5rem;
  &:hover {
    transform: scale(1.1);
  }
`;

export const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  width: 25%;
`;

export const ProfileTitles = styled.div`
  width: 90%;
`;

export const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
`;

//TODO: separar em um componenente DropDow

export const DropDowContainer = styled.div<Props>`
  position: absolute;
  top: 100%;
  margin-top: 110%;
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 20px;
  padding: 20px;
  min-width: 30vw;
  max-width: 40vw;
  transition: 0.3s ease-in-out all;
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
  padding-bottom: 6px;
  margin-bottom: 2px;
  &:last-child {
    border-bottom: 0px;
  }

  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0);
  }
`;
