import React, { FC, useState } from "react";
import * as Styled from "./styled";

type AlphabeticalFilterProps = {
  aT0Z: (order: boolean) => void;
};

const AlphabeticalFilter: FC<AlphabeticalFilterProps> = ({ aT0Z }) => {
  const [order, setOrder] = useState(false);

  const handleOrder = () => {
    aT0Z(order);
    setOrder(!order);
  };

  return (
    <Styled.Container>
      {order ? (
        <Styled.ZToA onClick={handleOrder} size={20} />
      ) : (
        <Styled.AToZ onClick={handleOrder} size={20} />
      )}
    </Styled.Container>
  );
};

export default AlphabeticalFilter;
