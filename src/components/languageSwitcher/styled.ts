import styled from "styled-components";

import { US } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";

export const USIcon = styled(US)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

export const BRIcon = styled(BR)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 10px;
`;
