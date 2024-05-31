import styled from "styled-components";

type ContainersProps = {
  gap?: string;
};

export const RowContainer = styled.div<ContainersProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap};
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
`;
