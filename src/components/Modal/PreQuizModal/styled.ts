import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.main.secondary};
  border: 5px solid ${({ theme }) => theme.colors.background.tertiary};
`;

export const Content = styled.div`
  padding: 20px;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  margin: 20px 0;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: auto 0 0 0;
`;

export const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 600px) {
    width: 30vw;
    height: 80vh;
  }
`;
