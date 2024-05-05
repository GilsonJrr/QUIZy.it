import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchInput from "components/inputs/SearchInput";

type CardProps = {
  title: string;
  children: ReactNode | ReactNode[];
  gridName?: string;
  isEmpty: boolean;
  emptyMessage?: string;
  redirectTo?: string;
  redirectPath?: string;
  scrollable?: boolean;
  width?: string;
  searchable?: boolean;
  searchValue?: string;
  setSearch?: (search: string) => void;
};

const Card: FC<CardProps> = ({
  title,
  children,
  gridName,
  isEmpty,
  emptyMessage,
  redirectTo,
  redirectPath = "/",
  scrollable,
  width,
  searchable,
  searchValue = "",
  setSearch,
}) => {
  const navigate = useNavigate();

  return (
    <Styled.Card gridName={gridName} scrollable={scrollable} width={width}>
      <Styled.CardHeader>
        <Styled.CardTitle>{title}</Styled.CardTitle>
        {searchable && (
          <SearchInput value={searchValue} setValue={(e) => setSearch?.(e)} />
        )}
        {redirectTo && (
          <Styled.RedirectButton onClick={() => navigate(redirectPath)}>
            {redirectTo} <FaArrowRight />
          </Styled.RedirectButton>
        )}
      </Styled.CardHeader>
      <Styled.CardInner scrollable={scrollable}>
        {isEmpty ? (
          <Styled.EmptyListMessage>{emptyMessage}</Styled.EmptyListMessage>
        ) : (
          children
        )}
      </Styled.CardInner>
    </Styled.Card>
  );
};

export default Card;
