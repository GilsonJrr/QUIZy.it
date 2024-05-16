import React, { FC, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../globalStyles";

type ThemeProps = { children: ReactNode | ReactNode[] };

const Theme: FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
