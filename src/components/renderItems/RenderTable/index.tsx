import React, { FC } from "react";
import * as Styled from "./styled";
import { TResult, TTutorResult } from "types/index";
import { useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";

type RenderTableProps = {
  item?: TResult;
  tutorResultTable?: TTutorResult;
  tutorView?: boolean;
};

const RenderTable: FC<RenderTableProps> = ({
  item,
  tutorResultTable,
  tutorView,
}) => {
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const handleDate = (date?: string) => {
    const newDate = new Date(date || "");

    const dia = newDate.getUTCDate().toString().padStart(2, "0");
    const mes = (newDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = newDate.getUTCFullYear();

    return `${mes}/${dia}/${ano}`;
  };

  const handleRetry = () => {
    tutorView
      ? navigate("/quizResult", {
          state: {
            score: item?.score,
            amount: item?.amount,
            quizResume: item?.quizResume,
            quizId: item?.quizId,
            studentName: item?.studentName,
          },
        })
      : navigate(`/quiz?quizId=${item?.quizId}`);
  };

  const handleOpenResult = () => {
    navigate("/quizResult", {
      state: {
        score: tutorResultTable?.extraInfo?.score,
        amount: tutorResultTable?.extraInfo?.amount,
        quizResume: tutorResultTable?.extraInfo?.resume,
        quizId: tutorResultTable?.extraInfo?.quizUid,
        studentName: tutorResultTable?.studentName,
      },
    });
  };

  console.log("name", item, tutorResultTable);

  if (item) {
    return isMobile ? (
      <Styled.ListContainer onClick={handleRetry}>
        <Styled.List>
          <Styled.ListTitle>{item?.quiz}</Styled.ListTitle>
          <Styled.ListInfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoText>
                {item?.score} / {item?.amount}
              </Styled.InfoText>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoText>{handleDate(item?.date)}</Styled.InfoText>
            </Styled.InfoContainer>
          </Styled.ListInfoContainer>
        </Styled.List>
      </Styled.ListContainer>
    ) : (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={50}>
          {item?.quiz}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={20}>
          {item?.score} / {item?.amount}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={20}>
          {handleDate(item?.date)}
        </Styled.TableBodyComponents>
        <Styled.Option onClick={handleRetry}>
          {tutorView ? "Open" : "Retry"}
        </Styled.Option>
      </Styled.TableContent>
    );
  }

  if (tutorResultTable) {
    return isMobile ? (
      <Styled.ListContainer onClick={handleOpenResult}>
        <Styled.List>
          <Styled.ListTitle>{tutorResultTable?.name}</Styled.ListTitle>
          <Styled.ListInfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoText>{tutorResultTable?.quiz}</Styled.InfoText>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoText>
                {tutorResultTable?.score} / {tutorResultTable?.amount}
              </Styled.InfoText>
            </Styled.InfoContainer>
          </Styled.ListInfoContainer>
        </Styled.List>
      </Styled.ListContainer>
    ) : (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={40}>
          {tutorResultTable?.name}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={40}>
          {tutorResultTable?.quiz}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={15}>
          {tutorResultTable?.score} / {tutorResultTable?.amount}
        </Styled.TableBodyComponents>
        <Styled.Option width={15} onClick={handleOpenResult}>
          Open
        </Styled.Option>
      </Styled.TableContent>
    );
  }

  return null;
};

export default RenderTable;
