import styled from "styled-components";

//Icons
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";

type Props = { user?: boolean };

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: 10px;
  @media screen and (min-width: 900px) {
    padding: 0px;
    border: 0px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.main.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
`;

export const TagBackGround = styled.div`
  background-color: ${({ theme }) => theme.colors.main.default};
  border-radius: 5px;
  padding: 8px;
  display: flex;
`;

export const InfoTagContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const AboutContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BirthDate = styled(BsCalendarDateFill)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;

export const Email = styled(MdEmail)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;

export const Phone = styled(FaPhoneSquare)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin: auto 0 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const TabContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.main.default};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0 0 0;

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  @media screen and (min-width: 900px) {
    padding: 0px;
    border-top: 0px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
export const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 48vh;
  min-height: 48vh;
  overflow: scroll;
  overflow-x: hidden;
`;

export const MessageTextContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  align-self: flex-end;
`;

export const MessageContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ user }) => (user ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

export const Message = styled.div<Props>`
  background-color: ${({ theme, user }) =>
    user ? theme.colors.quiz.right : theme.colors.main.default};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;
