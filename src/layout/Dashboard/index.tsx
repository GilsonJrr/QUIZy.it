import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { RouterTitle } from "types";

import Logo from "assets/images/Logo.png";

import { MdFactCheck } from "react-icons/md";

type dashboardProps = {
  children?: ReactNode | ReactNode[];
};

const Dashboard: FC<dashboardProps> = ({ children }) => {
  const location = useLocation();

  const userName = "Gilson Cosme de Vasconcelos Junior";
  const userType = "Student";
  const alerts = 5;
  const messages = 20;

  const currentUrl = location.pathname;
  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Header>
        <Styled.LogoContainer>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Styled.HeaderTitleText>
            {RouterTitle[currentUrl as keyof typeof RouterTitle]}
          </Styled.HeaderTitleText>
          <Styled.StartQuizButton>
            <MdFactCheck size={25} />
            Start Quiz
          </Styled.StartQuizButton>
        </Styled.HeaderTitle>
        <Styled.HeaderMessage>
          <Styled.AlertContainer>
            <Styled.Mail size={25} />
            <Styled.AlertTag>
              {messages >= 100 ? "99+" : messages}
            </Styled.AlertTag>
          </Styled.AlertContainer>
        </Styled.HeaderMessage>
        <Styled.HeaderMessage>
          <Styled.AlertContainer>
            <Styled.Alert size={25} />
            <Styled.AlertTag>{alerts >= 100 ? "99+" : alerts}</Styled.AlertTag>
          </Styled.AlertContainer>
        </Styled.HeaderMessage>
        <Styled.HeaderProfile>
          <Styled.ProfileTitles>
            <Styled.ProfileName>{userName || ""}</Styled.ProfileName>
            <Styled.UserType>{userType || ""}</Styled.UserType>
          </Styled.ProfileTitles>
          <Styled.ChevronLeft size={20} />
        </Styled.HeaderProfile>
      </Styled.Header>
      <Styled.Content>{children || <Outlet />}</Styled.Content>
    </Styled.Container>
  );
};

export default Dashboard;
