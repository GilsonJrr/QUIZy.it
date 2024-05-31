import styled from "styled-components";

import { TbMoonFilled } from "react-icons/tb";
import { MdSunny } from "react-icons/md";

type Props = {
  active?: boolean;
  width?: string;
};

export const Container = styled.div<Props>`
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.main.default};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? "flex-start" : "flex-end")};
  padding: 0 3px;
  height: 35px;
  cursor: pointer;
  width: 70px;
`;

export const Toggle = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Sum = styled(MdSunny)`
  color: ${({ theme }) => theme.colors.alert.warning};
`;

export const Moon = styled(TbMoonFilled)`
  color: ${({ theme }) => theme.colors.main.default};
`;
