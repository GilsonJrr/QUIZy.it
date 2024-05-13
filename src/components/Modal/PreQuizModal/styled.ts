import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

export const Image = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  background-color: #e6e6e6;
  border: 5px solid #ffffff;
`;

export const Content = styled.div`
  padding: 20px;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  margin: auto 0 0 0;
`;

export const Info = styled.p`
  text-transform: capitalize;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: auto 0 0 0;
`;

export const OptionButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &:hover {
    transform: scale(1.05);
  }
`;
