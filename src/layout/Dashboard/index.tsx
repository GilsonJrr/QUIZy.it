import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet } from "react-router-dom";

type dashboardProps = {
  children?: ReactNode | ReactNode[];
};

const Dashboard: FC<dashboardProps> = ({ children }) => {
  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Content>{children || <Outlet />}</Styled.Content>
    </Styled.Container>
  );
};

export default Dashboard;
