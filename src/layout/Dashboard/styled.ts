import styled from "styled-components";

import { IoMdMail } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

type Props = {
  open?: boolean;
};

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.highlight};
  height: 100vh;
`;

export const Content = styled.div`
  margin-top: 6vh;
  margin-left: 0px;
  width: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 600px) {
    height: 91%;
    width: calc(100vw - 7vw);
    margin-left: 7vw;
    margin-top: 9vh;
  }
`;

export const Header = styled.div`
  display: none;
  @media screen and (min-width: 600px) {
    position: fixed;
    display: flex;
    top: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background.default};
    z-index: 10000;
    height: 9vh;
  }
`;

export const HeaderMobile = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
  z-index: 10000;
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
    width: 7vw;
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
    width: 58vw;
    justify-content: space-between;
  }
`;

export const HeaderTitleText = styled.h1`
  font-size: 1.3rem;
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
  width: 5vw;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-left: none;
  padding: 10px 20px;
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
  width: 30vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
`;

export const ProfileTitles = styled.div`
  width: 90%;
`;

export const ProfileName = styled.h1`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1.1rem;
`;

export const UserType = styled.h2`
  font-size: 0.7rem;
  text-transform: capitalize;
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

export const MessageFrom = styled.h1`
  font-size: 1.2rem;
  margin: 6px 0;
`;

export const Message = styled.h2`
  font-size: 1rem;
  max-height: 2.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 400;
`;
