import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

type Props = { width?: string };

export const Container = styled.div<Props>`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 55px 20px 20px 55px;
  position: relative;
  width: ${({ width }) => width || "100%"};
`;

export const PhotoContainer = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 100%;
  background-color: #e6e6e6;
  border: 1px solid rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  padding: 10px 0 10px 20px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h1`
  font-size: 1.4rem;
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
  background-color: #4a4747;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
`;

export const Arrow = styled(FaArrowRight)`
  color: #ffffff;
`;
