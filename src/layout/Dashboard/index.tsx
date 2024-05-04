import React, { FC, ReactNode, useState } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { RouterTitle } from "types";

import Logo from "assets/images/Logo.png";

import { GiHamburgerMenu } from "react-icons/gi";

type dashboardProps = {
  children?: ReactNode | ReactNode[];
};

const Dashboard: FC<dashboardProps> = ({ children }) => {
  const location = useLocation();

  const [openMessages, setOpenMessages] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const userName = "UserName";
  const userType = "Student";

  const currentUrl = location.pathname;

  const handleBlur = () => {
    setTimeout(() => {
      setOpenMessages(false);
    }, 200);
  };

  const handleOpenMessages = () => {
    messages.length > 0 && setOpenMessages(!openMessages);
  };

  const messages: any[] = [];

  return (
    <Styled.Container>
      <Sidebar display={showMenu} onClose={() => setShowMenu(false)} />
      <Styled.Header>
        <Styled.LogoContainer>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Styled.HeaderTitleText>
            {RouterTitle[currentUrl as keyof typeof RouterTitle]}
          </Styled.HeaderTitleText>
          {/* <Styled.StartQuizButton>
            <MdFactCheck size={25} />
            Start Quiz
          </Styled.StartQuizButton> */}
        </Styled.HeaderTitle>
        <Styled.HeaderMessage>
          <Styled.AlertContainer
            onClick={handleOpenMessages}
            onBlur={handleBlur}
            tabIndex={0}
          >
            <Styled.Alert size={25} />
            {messages.length > 0 && (
              <Styled.AlertTag>
                {messages.length >= 100 ? "99+" : messages.length}
              </Styled.AlertTag>
            )}
            <Styled.DropDowContainer open={openMessages}>
              {messages?.map((message) => {
                return (
                  <Styled.MessageContainer>
                    <Styled.MessageFrom>{message.from}</Styled.MessageFrom>
                    <Styled.Message>{message.message}</Styled.Message>
                  </Styled.MessageContainer>
                );
              })}
            </Styled.DropDowContainer>
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
      <Styled.HeaderMobile>
        <Styled.LogoContainer>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Styled.HeaderTitleText>
            {RouterTitle[currentUrl as keyof typeof RouterTitle]}
          </Styled.HeaderTitleText>
        </Styled.HeaderTitle>
        <Styled.HeaderHamburgerMenu onClick={() => setShowMenu(!showMenu)}>
          <GiHamburgerMenu size={25} />
        </Styled.HeaderHamburgerMenu>
      </Styled.HeaderMobile>
      <Styled.Content>{children || <Outlet />}</Styled.Content>
    </Styled.Container>
  );
};

export default Dashboard;
