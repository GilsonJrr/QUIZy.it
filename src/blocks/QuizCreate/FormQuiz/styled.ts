import styled from "styled-components";

export const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  flex-direction: column;

  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  height: 100%;
  @media screen and (min-width: 900px) {
    margin-bottom: 0;
  }
`;
