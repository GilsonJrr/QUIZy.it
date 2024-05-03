import React, { FC } from "react";
import * as Styled from "./styled";
import { EQuizTitle, TResult } from "types/index";

type RenderTableProps = {
  item: TResult;
};

const RenderTable: FC<RenderTableProps> = ({ item }) => {
  const handleDate = (date: string) => {
    const newDate = new Date(date);

    const dia = newDate.getUTCDate().toString().padStart(2, "0");
    const mes = (newDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = newDate.getUTCFullYear();

    return `${mes}/${dia}/${ano}`;
  };

  return (
    <Styled.TableContent>
      <Styled.TableBodyComponents width={50}>
        {EQuizTitle[item.quiz as keyof typeof EQuizTitle]}
      </Styled.TableBodyComponents>
      <Styled.TableBodyComponents width={25}>
        {item.score}
      </Styled.TableBodyComponents>
      <Styled.TableBodyComponents width={25}>
        {handleDate(item.date)}
      </Styled.TableBodyComponents>
    </Styled.TableContent>
  );
};

export default RenderTable;
