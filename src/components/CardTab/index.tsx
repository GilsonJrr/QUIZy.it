import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { Title } from "components/ui/Typography/styled";
import useDeviceType from "hooks/useDeviceType";
import { TOptions } from "types/index";
import Tabs, { TTabs } from "components/Tabs";

type CardTabProps = {
  children: ReactNode | ReactNode[];
  gridName?: string;
  isEmpty: boolean;
  emptyMessage?: string;
  scrollable?: boolean;
  width?: string;
  isLoading?: boolean;
  innerCard?: boolean;
  height?: string;
  options: TOptions[];
};

const CardTab: FC<CardTabProps> = ({
  children,
  gridName,
  isEmpty,
  emptyMessage,
  scrollable,
  width,
  isLoading,
  innerCard,
  height,
  options,
}) => {
  const isMobile = useDeviceType();

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

  const tabPrepared = (): TTabs[] => {
    return options
      .map((option) => {
        return {
          label: option.option,
          action: option.onClick,
          active: option.active,
        };
      })
      .filter((tab) => tab.label !== "Profile");
  };

  return (
    <Styled.Wrapper height={height}>
      {!isMobile && (
        <Styled.TabContainer>
          {options?.map((option) => {
            return (
              <Styled.Tab
                active={option.active}
                onClick={() => option?.onClick?.()}
                displayOnActive={option.displayOnActive}
              >
                <Title size="small">{option.option}</Title>
              </Styled.Tab>
            );
          })}
        </Styled.TabContainer>
      )}
      {isMobile && <Tabs tabs={tabPrepared()} radius={10} tabActive />}
      <Styled.Card
        gridName={gridName}
        scrollable={scrollable}
        width={width}
        innerCard={innerCard}
        height={height}
        tab={!!options}
      >
        {isEmpty ? (
          <Styled.EmptyContainer>
            <Title
              size="small"
              fontWeight="lighter"
              textAlign="center"
              multiLine
            >
              {emptyMessage}
            </Title>
          </Styled.EmptyContainer>
        ) : (
          <Styled.CardInner scrollable={scrollable}>
            {children}
          </Styled.CardInner>
        )}
      </Styled.Card>
    </Styled.Wrapper>
  );
};

export default CardTab;
