import React, { FC, useEffect } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsSubstack } from "react-icons/bs";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import ModalTemplate from "../ModalTemplate";
import { useModalContext } from "../modalContext";
import { QuizTypeValues } from "Store/quiz/types";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMyList,
  requestMyListList,
  setMyList,
} from "Store/myList/actions";
import { RootState } from "Store/root-reducer";
import { MyListTypeValues } from "Store/myList/types";
import LoadingSpinner from "components/LoadingSpiner";
import Button from "components/Button";

type PreQuizModalProps = {
  item: QuizTypeValues;
};

const PreQuizModal: FC<PreQuizModalProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student } = useSelector((state: RootState) => state.student);
  const { myLists, isLoading } = useSelector(
    (state: RootState) => state.myList
  );

  const { handleModal } = useModalContext();

  const myListRequest = {
    tutorUid: student?.info?.tutorID || "",
    uid: student?.info?.tutorID || "",
    studentUid: student?.info?.uid || "",
    quizUid: item?.id,
  };

  const handleMyList = () => {
    if (isOnTheList) {
      return dispatch(removeMyList(myListRequest));
    }
    dispatch(setMyList(myListRequest));
  };

  useEffect(() => {
    if (myLists === undefined) {
      dispatch(requestMyListList(myListRequest));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myLists]);

  const isOnTheList = myLists?.includes(
    (item?.id ? item?.id : "") as MyListTypeValues
  );

  return (
    <ModalTemplate onClick={() => handleModal("")}>
      <Styled.Image src={item.image ? item.image : EmptyImage} />
      <Styled.Content>
        <Styled.Title>{item.title}</Styled.Title>
        <Styled.SubTitle>{item.description}</Styled.SubTitle>
        <Styled.InfoContainer>
          <Styled.Info>{item.category} </Styled.Info>|
          <Styled.Info> {item.type}</Styled.Info>
        </Styled.InfoContainer>
        <Styled.OptionContainer>
          <Button
            onClick={handleMyList}
            variant="secondary"
            padding="10px 20px"
            size="small"
          >
            {isLoading ? (
              <LoadingSpinner size="smaller" />
            ) : (
              <>
                {isOnTheList ? "Remove From List" : "Add to My list"}
                <BsSubstack size={12} />
              </>
            )}
          </Button>
          <Button
            onClick={() => navigate(`/quiz?quizId=${item.id}`)}
            variant="secondary"
            padding="10px 20px"
            size="small"
          >
            Start
            <FaPlay size={12} />
          </Button>
        </Styled.OptionContainer>
      </Styled.Content>
    </ModalTemplate>
  );
};

export default PreQuizModal;
