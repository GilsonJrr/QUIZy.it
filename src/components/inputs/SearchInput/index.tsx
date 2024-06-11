import React, { FC } from "react";
import * as Styled from "./styled";

type SearchInputProps = {
  value: string;
  setValue: (e: string) => void;
  width?: string;
};

const SearchInput: FC<SearchInputProps> = ({ setValue, value, width }) => {
  return (
    <Styled.Container width={width}>
      <Styled.Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Styled.Search size={15} />
    </Styled.Container>
  );
};

export default SearchInput;
