import React, { FC, useState, FocusEvent } from "react";
import * as Styled from "./styled";
import Button from "components/Button";
import { CirclePicker } from "react-color";
import { Title } from "components/ui/Typography/styled";

type ColorInputProps = {
  color: string;
  onChange: (color: string) => void;
  label?: string;
};

const ColorInput: FC<ColorInputProps> = ({ color, onChange, label }) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleLostFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelector(false);
    }
  };

  const handleOnChangeComplete = (color: string) => {
    onChange(color);
  };

  return (
    <Styled.Container tabIndex={0} onBlur={handleLostFocus}>
      <Title size="smaller">{label}</Title>
      <Button
        type="button"
        onClick={() => setShowSelector(!showSelector)}
        padding="11.5px"
        align="center"
      >
        Select Color
        <Styled.CurrentColor color={color} />
      </Button>
      <Styled.PickerContainer
        display={showSelector}
        onMouseLeave={() => setShowSelector(false)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <CirclePicker
          color={color}
          onChangeComplete={(e) => handleOnChangeComplete(e.hex)}
        />
      </Styled.PickerContainer>
    </Styled.Container>
  );
};

export default ColorInput;
