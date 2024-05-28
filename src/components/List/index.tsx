import React, { ReactNode } from "react";
import * as Styled from "./styled";
import { Title } from "components/ui/Typography/styled";

type ListProps<GenericProps extends object> = {
  content: GenericProps[];
  renderItem: (item: GenericProps) => ReactNode;
  filter?: boolean;
  search?: string;
  emptyState?: string;
  itemKey: string;
  wrap?: boolean;
};

const List = <GenericProps extends object>({
  content,
  renderItem,
  filter,
  search,
  emptyState,
  itemKey,
  wrap,
}: ListProps<GenericProps>) => {
  const filterContent = Array.isArray(content)
    ? content
        ?.filter((e) =>
          (e as Record<string, string>)[itemKey]
            ?.toUpperCase()
            .includes(search?.toUpperCase() || "")
        )
        .sort((a, b) => {
          const comparison = (a as Record<string, string>)[
            itemKey
          ].localeCompare((b as Record<string, string>)[itemKey]);
          return filter ? comparison : -comparison;
        })
    : [];

  if (filterContent.length === 0) {
    return (
      <Styled.EmptyState>
        <Title multiLine textAlign="center" size="small" fontWeight="lighter">
          {emptyState}
        </Title>
      </Styled.EmptyState>
    );
  }

  return (
    <Styled.List wrap={wrap}>
      {filterContent.map((result) => {
        return (
          <Styled.ListContent wrap={wrap}>
            {renderItem(result)}
          </Styled.ListContent>
        );
      })}
    </Styled.List>
  );
};

export default List;
