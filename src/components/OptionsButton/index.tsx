import React, { FC } from "react";
import * as Styled from "./styled";
import { TOptions } from "types/index";

type OptionsButtonProps = {
  options: TOptions[];
  width?: string;
};

const OptionsButton: FC<OptionsButtonProps> = ({ options, width = "25%" }) => {
  return (
    <Styled.OptionButtonContainer>
      {options.map((option) => {
        return (
          <Styled.OptionButton onClick={option.onClick} width={width}>
            {option.optionIcon}
            {option.option}
          </Styled.OptionButton>
        );
      })}
    </Styled.OptionButtonContainer>
  );
};

export default OptionsButton;
