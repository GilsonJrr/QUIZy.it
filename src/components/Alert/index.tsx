import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import { Title } from "components/ui/Typography/styled";
import Tooltip from "components/Tooltip";
import Button from "components/Button";
import { AlertTypeValues } from "Store/alert/types";
import { removeAlert, requestAlertList } from "Store/alert/actions";
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
  const { alerts } = useSelector((state: RootState) => state.alert);

  const [openMessages, setOpenMessages] = useState(false);

  const userType = user?.info?.userType || userStudent?.userType;

  const renderMessageList = () => {
    return (
      <Styled.MessageContainer>
        {alerts &&
          alerts.length > 0 &&
          alerts?.map((message) => {
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
    alerts && alerts?.length > 0 && setOpenMessages(!openMessages);
  };

  const handleOpenMessagesModal = () => {
    if (alerts?.length === 0) return;
    handleModal(
      <ModalTemplate>
        <Styled.DragClose />
        {renderMessageList()}
      </ModalTemplate>
    );
  };

  const handleOpenAlert = (message: AlertTypeValues) => {
    if (userType === "tutor") {
      message.senderUid &&
        navigate(
          `/students/student-profile?studentId=${message.senderUid}&&chat=true`
        );
      dispatch(
        removeAlert({
          tutorUid: user?.info?.uid || "",
          receiverUid: user?.info?.uid,
          senderUid: message.senderUid,
        })
      );
      return;
    }
    if (userType === "student") {
      navigate(`/?chat=true`);
      dispatch(
        removeAlert({
          tutorUid: userStudent?.tutorID || "",
          receiverUid: userStudent?.uid || "",
          senderUid: userStudent?.tutorID,
        })
      );
      return;
    }
  };

  const handleGotIt = (message: AlertTypeValues) => {
    if (userType === "tutor") {
      dispatch(
        removeAlert({
          tutorUid: user?.info?.uid || "",
          receiverUid: user?.info?.uid,
          senderUid: message.senderUid,
        })
      );
      return;
    }
    if (userType === "student") {
      dispatch(
        removeAlert({
          tutorUid: userStudent?.tutorID || "",
          receiverUid: userStudent?.uid || "",
          senderUid: userStudent?.tutorID,
        })
      );
      return;
    }
  };

  useEffect(() => {
    if (alerts === undefined) {
      if (userType === "tutor") {
        dispatch(
          requestAlertList({
            tutorUid: user?.info?.uid || "",
            receiverUid: user?.info?.uid || "",
          })
        );
      }
      if (userType === "student") {
        dispatch(
          requestAlertList({
            tutorUid: userStudent?.tutorID || "",
            receiverUid: userStudent?.uid || "",
          })
        );
      }
    }
  }, [alerts, dispatch, user, userStudent, userType]);

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
        {alerts && alerts?.length > 0 && (
          <Styled.AlertTag>
            {alerts && alerts?.length >= 100 ? "99+" : alerts?.length}
          </Styled.AlertTag>
        )}
      </Styled.AlertContainer>
    );
  }

  return (
    <Tooltip
      toolTipContent={renderMessageList()}
      position={"top"}
      disable={alerts?.length === 0}
    >
      <Styled.AlertContainer onClick={handleOpenMessages}>
        <Styled.Alert size={25} />
        {alerts && alerts?.length > 0 && (
          <Styled.AlertTag>
            {alerts && alerts?.length >= 100 ? "99+" : alerts.length}
          </Styled.AlertTag>
        )}
      </Styled.AlertContainer>
    </Tooltip>
  );
};

export default Alert;
