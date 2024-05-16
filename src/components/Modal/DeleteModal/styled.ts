import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
`;

export const Tile = styled.h2``;

export const SubTitle = styled.h3`
  margin: 20px 0 10px;
`;

export const ToBeDeletedTitle = styled.h1``;

export const ButtonContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.main.default};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
`;
