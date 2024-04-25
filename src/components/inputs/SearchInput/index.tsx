import React, { FC } from "react";
import * as Styled from "./styled";

import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  value: string;
  setValue: (e: string) => void;
};

const SearchInput: FC<SearchInputProps> = ({ setValue, value }) => {
  return (
    <Styled.Container>
      <Styled.Input value={value} onChange={(e) => setValue(e.target.value)} />
      <FaSearch size={20} />
    </Styled.Container>
  );
};

export default SearchInput;
