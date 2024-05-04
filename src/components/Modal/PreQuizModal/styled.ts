import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 40vw;
`;

export const Image = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px 15px 0 0;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

export const SubTitle = styled.h2``;

export const InfoContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

export const Info = styled.p``;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

export const OptionButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  width: 40%;
  font-size: 1.2rem;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.05);
  }
`;
