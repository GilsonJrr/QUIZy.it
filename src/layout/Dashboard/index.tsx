import React, { FC, ReactNode, useEffect, useState } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterTitle } from "types";

import Logo from "assets/images/Logo.png";

import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudentUser, requestUser } from "Store/user/actions";
import { useModalContext } from "components/Modal/modalContext";
import ProfileModal from "components/Modal/ProfileModal";
import { requestStudent } from "Store/students/actions";

type dashboardProps = {
  children?: ReactNode | ReactNode[];
};

const Dashboard: FC<dashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userStudent } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { student } = useSelector((state: RootState) => state.studentReducer);

  const { handleModal } = useModalContext();

  const [openMessages, setOpenMessages] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const currentUrl = location.pathname;
  const search = location.search && location.search[0];

  console.log("currentUrl", search[0]);

  const handleBlur = () => {
    setTimeout(() => {
      setOpenMessages(false);
    }, 200);
  };

  const handleOpenMessages = () => {
    messages.length > 0 && setOpenMessages(!openMessages);
  };

  const handleOpenProfile = () => {
    handleModal(<ProfileModal />);
  };

  const messages: any[] = [];

  const userId = localStorage.getItem("userId") || "";
  const userType = localStorage.getItem("userType") || "";

  useEffect(() => {
    dispatch(requestUser({ uid: userId }));
    dispatch(requestStudentUser({ uid: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(
      requestStudent({
        uid: userStudent?.tutorID || "",
        studentId: userStudent?.uid,
      })
    );
  }, [dispatch, userStudent, userType]);

  return (
    <Styled.Container>
      <Sidebar display={showMenu} onClose={() => setShowMenu(false)} />
      <Styled.Header>
        <Styled.LogoContainer onClick={() => navigate("/")}>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Styled.HeaderTitleText>
            {RouterTitle[`${currentUrl}${search}` as keyof typeof RouterTitle]}
          </Styled.HeaderTitleText>
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
        <Styled.HeaderProfile onClick={handleOpenProfile}>
          <Styled.ProfileTitles>
            <Styled.ProfileName>
              {user?.info?.name || student?.info?.name}
            </Styled.ProfileName>
            <Styled.UserType>
              {user?.info?.userType || student?.info?.userType || ""}
            </Styled.UserType>
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
            {RouterTitle[`${currentUrl}${search}` as keyof typeof RouterTitle]}
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
