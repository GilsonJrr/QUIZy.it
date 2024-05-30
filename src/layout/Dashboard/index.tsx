import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterTitle } from "types";

import Logo from "assets/images/Logo.png";

import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useModalContext } from "components/Modal/modalContext";
import ProfileModal from "components/Modal/ProfileModal";
import { requestStudent } from "Store/students/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";
import MenuModal from "components/Modal/MenuModal";
// import LanguageSwitcher from "components/languageSwitcher";
import { useAnimation } from "hooks/useAnimation";
import { Title } from "components/ui/Typography/styled";
import Tooltip from "components/Tooltip";
import Button from "components/Button";
import { AlertTypeValues } from "Store/alert/types";
import {
  removeAlert,
  requestStudentAlertList,
  requestTutorAlertList,
} from "Store/alert/actions";

type dashboardProps = {
  children?: ReactNode | ReactNode[];
};

const Dashboard: FC<dashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userStudent, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { student } = useSelector((state: RootState) => state.student);
  const { studentAlerts, tutorAlerts } = useSelector(
    (state: RootState) => state.alert
  );

  const { handleModal } = useModalContext();

  const [openMessages, setOpenMessages] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { triggerAnimation } = useAnimation();

  const currentUrl = location.pathname;
  const search = location.search && location.search[0];

  const userType = user?.info?.userType || userStudent?.userType;

  const handleOpenMessages = () => {
    messages?.length > 0 && setOpenMessages(!openMessages);
  };

  const handleOpenProfile = () => {
    handleModal(<ProfileModal />);
  };

  const messages = useMemo(() => {
    return userType === "student"
      ? Object.values(studentAlerts || "")
      : userType === "tutor"
      ? Object.values(tutorAlerts || "")
      : ([] as unknown as AlertTypeValues[]);
  }, [studentAlerts, tutorAlerts, userType]);

  const handleOpenAlert = (message: AlertTypeValues) => {
    if (userType === "tutor") {
      message.senderUid &&
        navigate(
          `/students/student-profile?studentId=${message.senderUid}&&chat=true`
        );
      dispatch(
        removeAlert({
          userType: "tutor",
          alertUid: message.senderUid,
          tutorUid: user?.info?.uid || "",
        })
      );
      return;
    }
    if (userType === "student") {
      navigate(`/?chat=true`);
      dispatch(
        removeAlert({
          userType: "student",
          studentUid: userStudent?.uid,
          alertUid: message.senderUid,
          tutorUid: userStudent?.tutorID || "",
        })
      );
      return;
    }
  };

  const handleGotIt = (message: AlertTypeValues) => {
    if (userType === "tutor") {
      dispatch(
        removeAlert({
          userType: "tutor",
          alertUid: message.senderUid,
          tutorUid: user?.info?.uid || "",
        })
      );
      return;
    }
    if (userType === "student") {
      dispatch(
        removeAlert({
          userType: "student",
          studentUid: userStudent?.uid,
          alertUid: message.senderUid,
          tutorUid: userStudent?.tutorID || "",
        })
      );
      return;
    }
  };

  useEffect(() => {
    dispatch(
      requestTutorAlertList({
        tutorUid: user?.info?.uid || "",
        userType: "tutor",
      })
    );
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(
      requestStudentAlertList({
        studentUid: userStudent?.uid,
        tutorUid: userStudent?.tutorID || "",
        userType: "student",
      })
    );
  }, [dispatch, userStudent]);

  useEffect(() => {
    if (userStudent) {
      dispatch(
        requestStudent({
          uid: userStudent?.tutorID || "",
          studentId: userStudent?.uid,
        })
      );
    }
  }, [dispatch, userStudent]);

  if (isLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.LogoContainer onClick={() => navigate("/")}>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Title>
            {RouterTitle[`${currentUrl}${search}` as keyof typeof RouterTitle]}
          </Title>
          {/* <LanguageSwitcher /> */}
        </Styled.HeaderTitle>
        <Styled.HeaderMessage>
          <Tooltip
            toolTipContent={
              <Styled.MessageContainer>
                {messages?.map((message) => {
                  return (
                    <Styled.Message>
                      <Title size="medium" fontWeight="bolder">
                        {message.type}
                      </Title>
                      <Title multiLine size="small">
                        {message.message}
                      </Title>
                      <Styled.MessageButtons>
                        <Button
                          onClick={() => handleOpenAlert(message)}
                          size="small"
                          width="100%"
                          align="center"
                        >
                          Open
                        </Button>
                        <Button
                          onClick={() => handleGotIt(message)}
                          variant="anchor-dark"
                          size="small"
                          width="100%"
                          align="center"
                        >
                          Got it
                        </Button>
                      </Styled.MessageButtons>
                    </Styled.Message>
                  );
                })}
              </Styled.MessageContainer>
            }
            position={"top"}
            disable={messages.length === 0}
          >
            <Styled.AlertContainer onClick={handleOpenMessages}>
              <Styled.Alert size={25} />
              {messages.length > 0 && (
                <Styled.AlertTag>
                  {messages.length >= 100 ? "99+" : messages.length}
                </Styled.AlertTag>
              )}
            </Styled.AlertContainer>
          </Tooltip>
        </Styled.HeaderMessage>
        <Styled.HeaderProfile onClick={handleOpenProfile}>
          <Styled.ProfileTitles>
            <Title size="small">
              {user?.info?.name || student?.info?.name}
            </Title>
            <Title size="smaller" fontWeight="lighter">
              {user?.info?.userType || student?.info?.userType || ""}
            </Title>
          </Styled.ProfileTitles>
          <Styled.ChevronLeft size={20} />
        </Styled.HeaderProfile>
      </Styled.Header>
      <Styled.HeaderMobile>
        <Styled.LogoContainer>
          <Styled.Logo src={Logo} />
        </Styled.LogoContainer>
        <Styled.HeaderTitle>
          <Title>
            {RouterTitle[`${currentUrl}${search}` as keyof typeof RouterTitle]}
          </Title>
        </Styled.HeaderTitle>
        <Styled.HeaderHamburgerMenu onClick={() => handleModal(<MenuModal />)}>
          <GiHamburgerMenu size={25} />
        </Styled.HeaderHamburgerMenu>
      </Styled.HeaderMobile>
      <Styled.Content>
        <Sidebar display={showMenu} onClose={() => setShowMenu(false)} />
        <Styled.ChildrenContainer triggerAnimation={triggerAnimation}>
          {children || <Outlet />}
        </Styled.ChildrenContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Dashboard;
