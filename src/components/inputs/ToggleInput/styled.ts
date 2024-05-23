import styled from "styled-components";

type Props = {
  active?: boolean;
  width?: string;
};

export const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: ${({ width }) => width};
`;

export const Container = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ active }) => (active ? "row" : "row-reverse")};
  padding: ${({ active }) => (active ? "0 5px 0 20px" : "0 20px 0 5px")};
  height: 50px;
  transition: 0.3s ease-in-out all;
  cursor: pointer;
  gap: 10px;
  min-width: 120px;
`;

export const Label = styled.label<Props>`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const Toggle = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.main.default};
  border-radius: 100%;
`;

export const OptionContainer = styled.div<Props>`
  display: flex;
  width: 50%;
`;
