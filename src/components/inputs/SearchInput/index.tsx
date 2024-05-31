import React, { FC } from "react";
import * as Styled from "./styled";

type SearchInputProps = {
  value: string;
  setValue: (e: string) => void;
};

const SearchInput: FC<SearchInputProps> = ({ setValue, value }) => {
  return (
    <Styled.Container>
      <Styled.Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Styled.Search size={15} />
    </Styled.Container>
  );
};

export default SearchInput;
