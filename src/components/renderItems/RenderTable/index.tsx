import React, { FC } from "react";
import * as Styled from "./styled";
import { EQuizTitle, TResult, TTutorResult } from "types/index";

type RenderTableProps = {
  item?: TResult;
  tutorResultTable?: TTutorResult;
};

const RenderTable: FC<RenderTableProps> = ({ item, tutorResultTable }) => {
  const handleDate = (date?: string) => {
    const newDate = new Date(date || "");

    const dia = newDate.getUTCDate().toString().padStart(2, "0");
    const mes = (newDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = newDate.getUTCFullYear();

    return `${mes}/${dia}/${ano}`;
  };

  if (item) {
    return (
      <Styled.TableContent>
        <Styled.TableBodyComponents width={50}>
          {EQuizTitle[item?.quiz as keyof typeof EQuizTitle]}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={20}>
          {item?.score}
        </Styled.TableBodyComponents>
        <Styled.TableBodyComponents width={20}>
          {handleDate(item?.date)}
        </Styled.TableBodyComponents>
        <Styled.Option>Retry</Styled.Option>
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
        <Styled.Option width={15}>Open</Styled.Option>
      </Styled.TableContent>
    );
  }

  return null;
};

export default RenderTable;
