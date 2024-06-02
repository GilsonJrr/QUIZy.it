import React, { FC, ReactNode, useEffect, useState } from "react";
import * as Styled from "./styled";
import Sidebar from "components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterTitle } from "types";

import Logo from "assets/images/Logo.png";

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
import Alert from "components/Alert";
import ThemeToggle from "components/ThemeToggle";

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

  const { handleModal } = useModalContext();

  const [showMenu, setShowMenu] = useState(false);
  const { triggerAnimation } = useAnimation();

  const currentUrl = location.pathname;
  const search = location.search && location.search[0];

  const handleOpenProfile = () => {
    handleModal(<ProfileModal />);
  };

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
          <Styled.TitleContainer>
            <Title>
              {
                RouterTitle[
                  `${currentUrl}${search}` as keyof typeof RouterTitle
                ]
              }
            </Title>
          </Styled.TitleContainer>
          {/* <Styled.OptionContainer>
            <LanguageSwitcher />
          </Styled.OptionContainer> */}
          <Styled.OptionContainer>
            <ThemeToggle />
          </Styled.OptionContainer>
        </Styled.HeaderTitle>
        <Styled.HeaderMessage>
          <Alert />
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
          <Alert />
        </Styled.HeaderTitle>
        <Styled.HeaderHamburgerMenu onClick={() => handleModal(<MenuModal />)}>
          <Styled.Hamburger size={25} />
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
