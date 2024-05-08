import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;
`;

export const Label = styled.label<Props>`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const Select = styled.select<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const Option = styled.option<Props>`
  border-radius: 10px;
  font-size: 1.4rem;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const Error = styled.p`
  position: absolute;
  top: 100%;
  margin-top: 3px;
  font-size: 0.8rem;
  color: red;
`;