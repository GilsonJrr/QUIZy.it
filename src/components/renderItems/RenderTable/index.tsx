import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";
import { Title } from "components/ui/Typography/styled";
import { ResultTypeValues } from "Store/result/types";

type RenderTableProps = {
  item?: ResultTypeValues;
  tutorResultTable?: ResultTypeValues;
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
            quizResume: item?.resume,
            quizId: item?.quizUid,
            studentName: item?.studentName,
            allInfo: item,
          },
        })
      : navigate(`/quiz?quizId=${item?.quizUid}`);
  };

  const handleOpenResult = () => {
    navigate("/quizResult", {
      state: {
        score: tutorResultTable?.score,
        amount: tutorResultTable?.amount,
        quizResume: tutorResultTable?.resume,
        quizId: tutorResultTable?.quizUid,
        studentName: tutorResultTable?.studentName,
        allInfo: tutorResultTable,
      },
    });
  };

  if (item) {
    return isMobile ? (
      <Styled.ListContainer onClick={handleRetry}>
        <Styled.List>
          <Title>{item?.quizTitle}</Title>
          <Styled.ListInfoContainer>
            <Styled.InfoContainer>
              <Title fontWeight="lighter">
                {item?.score} / {item?.amount}
              </Title>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Title fontWeight="lighter">{handleDate(item?.date)}</Title>
            </Styled.InfoContainer>
          </Styled.ListInfoContainer>
        </Styled.List>
      </Styled.ListContainer>
    ) : (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={50}>
          <Title size="smaller" fontWeight="lighter">
            {item?.quizTitle}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={15}>
          <Title size="smaller" fontWeight="lighter">
            {item?.score} / {item?.amount}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={20}>
          <Title size="smaller" fontWeight="lighter">
            {handleDate(item?.date)}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.Option onClick={handleRetry} width={15}>
          <Title size="smaller" fontWeight="lighter" color="light">
            {tutorView ? "Open" : "Retry"}
          </Title>
        </Styled.Option>
      </Styled.TableContent>
    );
  }

  if (tutorResultTable) {
    return isMobile ? (
      <Styled.ListContainer onClick={handleOpenResult}>
        <Styled.List>
          <Title>{tutorResultTable?.studentName}</Title>
          <Styled.ListInfoContainer>
            <Title fontWeight="lighter">{tutorResultTable?.quizTitle}</Title>
            <Title fontWeight="lighter">
              {tutorResultTable?.score} / {tutorResultTable?.amount}
            </Title>
          </Styled.ListInfoContainer>
        </Styled.List>
      </Styled.ListContainer>
    ) : (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={40}>
          <Title size="smaller" fontWeight="lighter">
            {tutorResultTable?.studentName}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={40}>
          <Title size="smaller" fontWeight="lighter">
            {tutorResultTable?.quizTitle}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={15}>
          <Title size="smaller" fontWeight="lighter">
            {tutorResultTable?.score} / {tutorResultTable?.amount}
          </Title>
        </Styled.TableBodyComponents>
        <Styled.Option width={15} onClick={handleOpenResult}>
          <Title size="smaller" fontWeight="lighter" color="light">
            Open
          </Title>
        </Styled.Option>
      </Styled.TableContent>
    );
  }

  return null;
};

export default RenderTable;
