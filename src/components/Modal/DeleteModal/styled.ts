import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  background-color: #ffffff;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

export const Tile = styled.h2``;

export const SubTitle = styled.h3`
  margin: 20px 0 10px;
`;

export const ToBeDeletedTitle = styled.h1``;

export const ButtonContainer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
`;

export const ConfirmButton = styled.button`
  background-color: #c78788;
  outline: none;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 40px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.3s ease-in-out all;

  &:disabled {
    opacity: 0.5;
  }
`;

export const CancelButton = styled.button`
  background-color: #4a4747;
  outline: none;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 40px;
  font-size: 1.3rem;
  cursor: pointer;
`;
