import styled from "styled-components";

type Props = {
  progress?: number;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 600px) {
    width: 100%;
    height: calc(100vh - 19vh);

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
  padding: 20px 40px;
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

export const ProgressBar = styled.div`
  background-color: #ffffff;
  border-radius: 50px;
  width: 100%;
  height: 30px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const ProgressBarFill = styled.div<Props>`
  position: absolute;
  top: 0;
  border-radius: 50px;
  display: ${({ progress }) => (progress ? "flex" : "none")};
  width: ${({ progress }) => (progress ? progress : 0)}%;
  height: 100%;
  background-color: #4a4747;
  color: #ffff;
  padding: 0 15px;
  align-items: center;
`;
