import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchInput from "components/inputs/SearchInput";
import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";

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
  isLoading?: boolean;
  innerCard?: boolean;
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
  isLoading,
  innerCard,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Styled.Card
        gridName={gridName}
        scrollable={scrollable}
        width={width}
        innerCard={innerCard}
      >
        <LoadingContainerCard>
          <LoadingSpinner size="medium" />
        </LoadingContainerCard>
      </Styled.Card>
    );
  }

  const handleJustify = () => {
    switch (true) {
      case (searchable && !!redirectTo) ||
        (!!title && searchable) ||
        (!!title && !!redirectTo):
        return "space-between";
      case !!redirectTo:
        return "flex-end";
      case searchable && !redirectTo && !title:
        return "center";
    }
  };

  return (
    <Styled.Card
      gridName={gridName}
      scrollable={scrollable}
      width={width}
      innerCard={innerCard}
    >
      <Styled.CardHeader justify={handleJustify()}>
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
