import React, { FC } from "react";
import * as Styled from "./styled";
import { TResult } from "types/index";

type RenderTableProps = {
  item: TResult;
};

const RenderTable: FC<RenderTableProps> = ({ item }) => {
  return (
    <Styled.TableContent>
      <Styled.TableBodyComponents width={50}>
        {item.quiz}
      </Styled.TableBodyComponents>
      <Styled.TableBodyComponents width={25}>
        {item.score}
      </Styled.TableBodyComponents>
      <Styled.TableBodyComponents width={25}>
        {item.date}
      </Styled.TableBodyComponents>
    </Styled.TableContent>
  );
};

export default RenderTable;
