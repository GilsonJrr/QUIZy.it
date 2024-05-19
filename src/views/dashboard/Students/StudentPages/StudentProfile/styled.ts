import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 0.9fr 1fr 1.3fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-areas:
      "results results categories information"
      "results results categories information"
      "results results categories information"
      "group group group information"
      "group group group information";
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const GroupContainer = styled.div`
  display: flex;
  gap: 10px;
`;

//Divide no Bloco de Categorie Results
export const ProgressWrapper = styled.div``;

export const ProgressTitle = styled.h3``;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 10px;
`;
