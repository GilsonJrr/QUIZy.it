import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import ModalTemplate from "../ModalTemplate";
import { useModalContext } from "../modalContext";
import { GoAlertFill } from "react-icons/go";
import LoadingSpinner from "components/LoadingSpiner";
import Button from "components/Button";
import { Title } from "components/ui/Typography/styled";

type DeleteModalProps = {
  deleteTitle: string;
  onDelete: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ deleteTitle, onDelete }) => {
  const { handleModal } = useModalContext();

  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    onDelete();
    handleModal("");
  };

  useEffect(() => {
    const timeOut = () => {
      setTimeout(() => {
        setShowDelete(true);
      }, 1500);
    };

    timeOut();
  }, []);

  return (
    <ModalTemplate onClick={() => handleModal("")}>
      <Styled.Container onClick={(event) => event.stopPropagation()}>
        <Styled.TitleContainer>
          <GoAlertFill size={20} />
          <Title size="bigger">Delete</Title>
        </Styled.TitleContainer>
        <Title size="small" fontWeight="normal" margin="20px 0 10px 0">
          Are you sure that you want to delete
        </Title>
        <Title size="big">{deleteTitle}</Title>
        <Styled.ButtonContainer>
          <Button
            onClick={handleDelete}
            variant="danger"
            disabled={!showDelete}
          >
            {showDelete ? "Delete" : <LoadingSpinner />}
          </Button>
          <Button onClick={() => handleModal("")}>Cancel</Button>
        </Styled.ButtonContainer>
      </Styled.Container>
    </ModalTemplate>
  );
};

export default DeleteModal;
