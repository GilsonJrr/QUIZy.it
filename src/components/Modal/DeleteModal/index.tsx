import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import ModalTemplate from "../ModalTemplate";
import { useModalContext } from "../modalContext";
import { GoAlertFill } from "react-icons/go";
import LoadingSpinner from "components/LoadingSpiner";

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
          <Styled.Tile>Delete</Styled.Tile>
        </Styled.TitleContainer>
        <Styled.SubTitle>Are you sure that you want to delete</Styled.SubTitle>
        <Styled.ToBeDeletedTitle>{deleteTitle}</Styled.ToBeDeletedTitle>
        <Styled.ButtonContainer>
          <Styled.ConfirmButton onClick={handleDelete}>
            {showDelete ? "Delete" : <LoadingSpinner />}
          </Styled.ConfirmButton>
          <Styled.CancelButton onClick={() => handleModal("")}>
            Cancel
          </Styled.CancelButton>
        </Styled.ButtonContainer>
      </Styled.Container>
    </ModalTemplate>
  );
};

export default DeleteModal;
