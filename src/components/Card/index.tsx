import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchInput from "components/inputs/SearchInput";
import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import Button from "components/Button";
import { Title } from "components/ui/Typography/styled";

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
        <Title>{title}</Title>
        {searchable && (
          <SearchInput value={searchValue} setValue={(e) => setSearch?.(e)} />
        )}
        {redirectTo && (
          <Button
            onClick={() => navigate(redirectPath)}
            variant="anchor-dark"
            size="small"
            padding="0px"
          >
            {redirectTo} <FaArrowRight />
          </Button>
        )}
      </Styled.CardHeader>
      <Styled.CardInner scrollable={scrollable}>
        {isEmpty ? (
          <Title size="small" fontWeight="lighter" textAlign="center">
            {emptyMessage}
          </Title>
        ) : (
          children
        )}
      </Styled.CardInner>
    </Styled.Card>
  );
};

export default Card;
