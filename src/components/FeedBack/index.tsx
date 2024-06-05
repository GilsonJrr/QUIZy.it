import React, { FC, useState } from "react";
import * as Styled from "./styled";
import Tooltip from "components/Tooltip";
import TextAreaInput from "components/inputs/TextAreaInput";
import Button from "components/Button";
import { Title } from "components/ui/Typography/styled";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useModalContext } from "components/Modal/modalContext";
import AlertModal from "components/Modal/AlertModal";
import useDeviceType from "hooks/useDeviceType";
import { useTranslation } from "react-i18next";

const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_FEEDBACK_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_FEEDBACK_ID;

type FeedBackProps = {};

const FeedBack: FC<FeedBackProps> = () => {
  const isMobile = useDeviceType();
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);

  const { handleModal } = useModalContext();

  const [feedback, setFeedback] = useState("");
  const [openTooltip, setOpenTooltip] = useState(false);

  const sendEmail = () => {
    if (!feedback) return;

    const data = {
      from_name: user?.info?.name || student?.info?.name,
      message: feedback,
      to_name: "Gilson",
    };

    if (SERVICE_ID && TEMPLATE_FEEDBACK_ID) {
      emailjs
        .send(SERVICE_ID, TEMPLATE_FEEDBACK_ID, data, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            handleModal(
              <AlertModal
                type={"success"}
                message={"Feedback sent successfully"}
              />
            );
          },
          (error) => {
            handleModal(
              <AlertModal
                type={"error"}
                message={`Feedback sent failed: ${error.text}`}
              />
            );
          }
        );
    }

    setFeedback("");
    setOpenTooltip(false);
  };

  const renderFeedbackForm = () => {
    return (
      <Styled.Container>
        <Title size="small" multiLine>
          {t("components.feedBack.title")}
        </Title>
        <TextAreaInput
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          size="small"
        />
        <Button width="100%" align="center" onClick={() => sendEmail()}>
          {t("components.feedBack.sendButton")}
        </Button>
      </Styled.Container>
    );
  };

  if (isMobile) {
    return (
      <Styled.Details>
        <Styled.Summary>
          <Title color="light">{t("components.feedBack.button")}</Title>
        </Styled.Summary>
        {renderFeedbackForm()}
      </Styled.Details>
    );
  }

  return (
    <Tooltip
      toolTipContent={renderFeedbackForm()}
      position={"top"}
      editable
      showTooltip={openTooltip}
    >
      <Button
        size="small"
        variant="secondary"
        padding="10px 15px"
        onClick={() => setOpenTooltip(true)}
      >
        {t("components.feedBack.button")}
      </Button>
    </Tooltip>
  );
};

export default FeedBack;
