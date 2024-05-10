import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import Card from "components/Card";

type QuizFormProps = {
  children: ReactNode | ReactNode[];
  preview: ReactNode | ReactNode[];
  edit: boolean;
  handleDelete?: () => void;
  formName: string;
  title: string;
  buttonTitle: string;
};

const QuizForm: FC<QuizFormProps> = ({
  children,
  preview,
  edit,
  handleDelete,
  formName,
  title,
  buttonTitle,
}) => {
  return (
    <Styled.Container>
      <Card title={title} isEmpty={false} gridName="newQuiz">
        {children}
      </Card>
      <Card title={"Preview"} isEmpty={false} gridName="newQuestion">
        {preview}
      </Card>
      <Styled.ButtonContainer justify={edit ? "space-between" : "flex-end"}>
        {edit && (
          <Styled.DeleteButton type="button" onClick={handleDelete}>
            Delete Group
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
