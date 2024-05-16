import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

type Props = { width?: string };

export const Container = styled.div<Props>`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 100px 20px 20px 100px;
  position: relative;
  width: ${({ width }) => width || "100%"};
`;

export const PhotoContainer = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  padding: 10px 0 10px 20px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h1`
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const InnerInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
`;

export const Info = styled.h2`
  font-size: 1rem;
  margin-right: 5px;
`;

export const Contact = styled.h3`
  font-size: 0.7rem;
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
