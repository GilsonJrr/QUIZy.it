import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";

type QuizFormProps = {
  children: ReactNode | ReactNode[];
  preview: ReactNode | ReactNode[];
  edit: boolean;
  handleDelete?: () => void;
  formName: string;
  title: string;
  buttonTitle: string;
  deleteTitle?: string;
};

const QuizForm: FC<QuizFormProps> = ({
  children,
  preview,
  edit,
  handleDelete,
  formName,
  title,
  buttonTitle,
  deleteTitle,
}) => {
  const isMobile = useDeviceType();

  return (
    <Styled.Container>
      <Card
        title={isMobile ? "" : title}
        isEmpty={false}
        gridName={"newQuiz"}
        innerCard={isMobile}
        scrollable={isMobile}
      >
        {children}
      </Card>
      {!isMobile && (
        <Card title={"Preview"} isEmpty={false} gridName="newQuestion">
          {preview}
        </Card>
      )}
      <Styled.ButtonContainer justify={edit ? "space-between" : "flex-end"}>
        {edit && (
          <Styled.DeleteButton type="button" onClick={handleDelete}>
            {deleteTitle}
          </Styled.DeleteButton>
        )}
        <Styled.SubmitButton type="submit" form={formName}>
          {buttonTitle}
        </Styled.SubmitButton>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default QuizForm;
