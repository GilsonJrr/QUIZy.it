import styled from "styled-components";

import { HiBellAlert } from "react-icons/hi2";

export const AlertContainer = styled.div`
  position: relative;

  transition: 0.2s ease-in-out all;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Alert = styled(HiBellAlert)`
  color: ${({ theme }) => theme.colors.main.default};
`;

export const AlertTag = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.alert.warning};
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

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
  padding-bottom: 6px;
  margin-bottom: 2px;
  gap: 2px;
  &:last-child {
    border-bottom: 0px;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 25px 0 25px;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  padding: 20px 0;
  max-height: 50vh;
  min-height: 50vh;
  @media screen and (min-width: 600px) {
    width: 350px;
    padding: 0 0;
    min-height: 20vh;
    max-height: 60vh;
  }
`;

export const MessageButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 8px 0;
`;

export const DragClose = styled.div`
  background-color: ${({ theme }) => theme.colors.main.default};
  height: 10px;
  width: 15%;
  border-radius: 10px;
  margin: 20px auto 0;
`;
