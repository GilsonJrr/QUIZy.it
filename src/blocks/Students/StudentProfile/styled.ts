import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;

  @media screen and (min-width: 900px) {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 0.9fr 1fr 1.6fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-areas:
      "results results results information"
      "results results results information"
      "results results results information"
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
  padding: 10px 0 0 0;
`;

export const GroupContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const TabContainer = styled.div`
  position: absolute;
  top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.main.default};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  div {
    width: auto;
  }

  @media screen and (min-width: 900px) {
    border-top: 0px;
    width: auto;
  }
`;

//Divide no Bloco de Categorie Results
export const ProgressWrapper = styled.div``;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 10px;
`;
