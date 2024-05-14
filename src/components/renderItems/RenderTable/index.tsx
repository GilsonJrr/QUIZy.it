import React, { FC } from "react";
import * as Styled from "./styled";
import { TResult, TTutorResult } from "types/index";
import { useNavigate } from "react-router-dom";

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
      },
    });
  };

  if (item) {
    return (
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
    return (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={40}>
          {tutorResultTable?.name}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={40}>
          {tutorResultTable?.quiz}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={15}>
          {tutorResultTable?.score}
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
