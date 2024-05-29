import styled, { css } from "styled-components";

type Props = { user?: boolean };

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: auto 0 0 0;
  /* height: 100%; */
`;

export const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  /* height: 100%; */
`;

export const Content = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0 0;
  height: 80%;
  width: 100%;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: hidden; */

  /* width: 100%;
  height: 100%;
  margin: 10px 0 0 0; */

  height: 70vh;
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0 0;
  /* height: 80%; */
  width: 100%;
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

  @media screen and (min-width: 600px) {
    padding: 0px;
    border-top: 0px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const MessageTextContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  align-self: flex-end;
`;

export const MessageContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  /* flex-direction: ${({ user }) => (user ? "row" : "row-reverse")}; */
  justify-content: ${({ user }) => (user ? "flex-end" : "flex-start")};
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
`;

export const ArrowLeft = css`
  position: absolute;
  left: -16px;
  border-left: 8px solid transparent;
  border-right: 8px solid ${({ theme }) => theme.colors.main.default};
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
`;

export const ArrowRight = css`
  position: absolute;
  right: -16px;
  border-left: 8px solid ${({ theme }) => theme.colors.quiz.right};
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
`;

export const Message = styled.div<Props>`
  background-color: ${({ theme, user }) =>
    user ? theme.colors.quiz.right : theme.colors.main.default};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  position: relative;

  ::after {
    content: "";
    ${({ user }) => (user ? ArrowRight : ArrowLeft)}
  }
`;
