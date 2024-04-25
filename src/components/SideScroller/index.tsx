import React, { ReactNode, useEffect, useState } from "react";
import * as Styled from "./styled";

type ScrollerProps<GenericProps> = {
  title?: string | ReactNode;
  displayQuantity: number;
  collection: GenericProps[];
  renderItem: (item: GenericProps) => ReactNode;
  backgroundColor?: string;
};

const SideScroller = <GenericProps,>({
  collection,
  renderItem,
  displayQuantity,
  title,
  backgroundColor,
}: ScrollerProps<GenericProps>) => {
  const [step, setStep] = useState(0);
  const [navigated, setNavigated] = useState(false);
  const [notLongEnough, setNotLongEnough] = useState(false);

  useEffect(() => {
    if (collection.length <= displayQuantity + 1) {
      setNotLongEnough(true);
    }
  }, [collection, displayQuantity]);

  const splitArray = (array: GenericProps[], size: number) => {
    if (array.length <= size + 1) {
      return [array];
    }
    const result: any[] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    const divided = result.map((res, index) => {
      if (index === 0) {
        return [array[array.length - 1], ...res, array[res.length]];
      }
      if (index === result.length - 1) {
        return [
          result[index - 1][result[index - 1].length - 1],
          ...res,
          ...array.slice(0, size + 1 - res.length),
        ];
      }
      return [
        result[index - 1][result[index - 1].length - 1],
        ...res,
        result[index + 1][0],
      ];
    });

    return divided;
  };

  const divideCollection = splitArray(collection, displayQuantity);

  const handleScroll = (direction: "forward" | "backward", size: number) => {
    setNavigated(true);
    if (direction === "forward") {
      divideCollection.length - 1 > step ? setStep(step + 1) : setStep(0);
    }
    if (direction === "backward") {
      step === 0 ? setStep(divideCollection.length - 1) : setStep(step - 1);
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.SideScroller>
        <Styled.ScrollButtons
          onClick={() => handleScroll("backward", collection.length)}
          side="left"
          show={navigated}
          backgroundColor={backgroundColor}
        >
          <Styled.ArrowLeft size={40} />
        </Styled.ScrollButtons>
        <Styled.CentralItemsContainer navigated={navigated}>
          {divideCollection[step]
            ?.slice(
              navigated || notLongEnough ? 0 : 1,
              divideCollection[step].length
            )
            .map((item) => {
              return (
                <Styled.ScrollerItem displayQuantity={displayQuantity}>
                  {renderItem(item)}
                </Styled.ScrollerItem>
              );
            })}
        </Styled.CentralItemsContainer>
        <Styled.ScrollButtons
          onClick={() => handleScroll("forward", collection.length)}
          side="right"
          show={!(collection.length < displayQuantity + 1)}
          backgroundColor={backgroundColor}
        >
          <Styled.ArrowRight size={40} />
        </Styled.ScrollButtons>
      </Styled.SideScroller>
    </Styled.Container>
  );
};

export default SideScroller;
