import styled from "styled-components";

import { IoMdMail } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

export const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  margin-top: 9vh;
  height: 91%;
  margin-left: 7vw;
  width: calc(100vw - 7vw);
  overflow: hidden;
`;

export const Header = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  background-color: #f8f8f8;
  z-index: 10000;
  height: 9vh;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  padding: 10px 20px;
`;

export const Logo = styled.img`
  width: 80%;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 53vw;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-left: none;
  padding: 10px 20px;
`;

export const HeaderTitleText = styled.h1`
  font-size: 1.3rem;
`;

export const StartQuizButton = styled.button`
  border: 1px solid #000000;
  padding: 5px 10px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #b0d9d1;
    border: 1px solid #b0d9d1;
  }
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
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
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
`;

export const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
`;
