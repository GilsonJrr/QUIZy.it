import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

type TOptions = {
  label: string;
  value: boolean;
};

type ToggleInputProps = {
  options: TOptions[];
  Label: string;
  setValue: (value: boolean) => void;
  width?: string;
};

const ToggleInput: FC<ToggleInputProps> = ({
  options,
  Label,
  setValue,
  width,
}) => {
  const [active, setActive] = useState(0);

  const handleToggle = (value: boolean) => {
    setValue(!value);
    active === 0 ? setActive(1) : setActive(0);
  };

  useEffect(() => {
    setValue(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Wrapper width={width}>
      <Styled.Label>{Label}</Styled.Label>
      {options.map((option, index) => {
        if (active === index) {
          return (
            <Styled.Container
              onClick={() => handleToggle(option.value)}
              active={active === 0}
            >
              <Styled.OptionContainer active={active === 0}>
                <Styled.Option>{option.label}</Styled.Option>
              </Styled.OptionContainer>
              <Styled.Toggle />
            </Styled.Container>
          );
        }

        return null;
      })}
    </Styled.Wrapper>
  );
};

export default ToggleInput;
