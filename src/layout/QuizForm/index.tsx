import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpiner";

type QuizFormProps = {
  children: ReactNode | ReactNode[];
  preview: ReactNode | ReactNode[];
  edit: boolean;
  handleDelete?: () => void;
  formName: string;
  title: string;
  buttonTitle: string;
  deleteTitle?: string;
  disabled?: boolean;
  loading?: boolean;
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
  disabled,
  loading,
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
          <Button type="button" onClick={handleDelete} variant="danger">
            {deleteTitle}
          </Button>
        )}
        <Button type="submit" form={formName} disabled={disabled}>
          {loading ? (
            <LoadingSpinner color="light" size="small" />
          ) : (
            buttonTitle
          )}
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default QuizForm;
