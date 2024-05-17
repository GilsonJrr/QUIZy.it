import styled from "styled-components";

import { FaGlobe } from "react-icons/fa6";

type Props = {};

export const Container = styled.div<Props>`
  margin: 0 40px 0 0;
`;

export const GlobeIcon = styled(FaGlobe)`
  cursor: pointer;
`;
