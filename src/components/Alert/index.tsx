import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import { Title } from "components/ui/Typography/styled";
import Tooltip from "components/Tooltip";
import Button from "components/Button";
import { AlertTypeValues } from "Store/alert/types";
import {
  removeAlert,
  requestStudentAlertList,
  requestTutorAlertList,
} from "Store/alert/actions";
import useDeviceType from "hooks/useDeviceType";
import { useModalContext } from "components/Modal/modalContext";
import ModalTemplate from "components/Modal/ModalTemplate";

type AlertProps = {};

const Alert: FC<AlertProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();
  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const { studentAlerts, tutorAlerts } = useSelector(
    (state: RootState) => state.alert
  );

  const [openMessages, setOpenMessages] = useState(false);

  const userType = user?.info?.userType || userStudent?.userType;

  const renderMessageList = () => {
    return (
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
    );
  };

  const handleOpenMessages = () => {
    messages?.length > 0 && setOpenMessages(!openMessages);
  };

  const handleOpenMessagesModal = () => {
    if (messages?.length === 0) return;
    handleModal(
      <ModalTemplate>
        <Styled.DragClose />
        {renderMessageList()}
      </ModalTemplate>
    );
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

  if (isMobile) {
    return (
      <Styled.AlertContainer onClick={handleOpenMessagesModal}>
        <Styled.Alert size={25} />
        {messages.length > 0 && (
          <Styled.AlertTag>
            {messages.length >= 100 ? "99+" : messages.length}
          </Styled.AlertTag>
        )}
      </Styled.AlertContainer>
    );
  }

  return (
    <Tooltip
      toolTipContent={renderMessageList()}
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
  );
};

export default Alert;
