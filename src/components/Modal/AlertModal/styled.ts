import styled, { keyframes } from "styled-components";

import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type typeProps = "error" | "success" | "warning" | "info";
type Props = { type?: typeProps };

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100000;
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

export const Content = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.default};
  position: absolute;
  top: 5px;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid
    ${({ theme, type }) => theme.colors.alert[type as typeProps]};
  display: flex;
  gap: 15px;
  animation: ${fadeIn} 0.2s ease-in-out;
  max-width: 100vw;
  @media screen and (min-width: 600px) {
    max-width: 30vw;
  }
`;

export const IconContainer = styled.div``;

export const TextContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CloseContainer = styled.div``;

export const Title = styled.h1<Props>`
  font-size: 1.4rem;
  color: ${({ theme, type }) => theme.colors.alert[type as typeProps]};
`;

export const Message = styled.p``;

export const ErrorIcon = styled(MdError)`
  color: ${({ theme }) => theme.colors.alert.error};
`;

export const SuccessIcon = styled(FaCheckCircle)`
  color: ${({ theme }) => theme.colors.alert.success};
`;

export const WarningIcon = styled(IoIosWarning)`
  color: ${({ theme }) => theme.colors.alert.warning};
`;

export const InfoIcon = styled(FaInfoCircle)`
  color: ${({ theme }) => theme.colors.alert.info};
`;

export const CloseIcon = styled(IoMdClose)`
  color: ${({ theme }) => theme.colors.alert.info};
  cursor: pointer;
`;
