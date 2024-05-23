import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

type Props = { width?: string };

export const Container = styled.div<Props>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 100px 20px 20px 100px;
  position: relative;
  width: ${({ width }) => width || "100%"};
  max-height: 121px;
`;

export const InfoContainer = styled.div`
  padding: 10px 0 10px 20px;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const InnerInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 30px 0 auto;
`;

export const ActionButton = styled.div`
  background-color: ${({ theme }) => theme.colors.main.default};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
`;

export const Arrow = styled(FaArrowRight)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;
