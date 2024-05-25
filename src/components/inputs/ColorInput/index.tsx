import React, { FC, useState } from "react";
import * as Styled from "./styled";
import Button from "components/Button";
import { BlockPicker } from "react-color";
import { Title } from "components/ui/Typography/styled";

type ColorInputProps = {
  color: string;
  onChange: (color: string) => void;
  label?: string;
};

const ColorInput: FC<ColorInputProps> = ({ color, onChange, label }) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleLostFocus = () => {
    const timeout = setTimeout(() => {
      setShowSelector(false);
    }, 200);
    return () => clearTimeout(timeout);
  };

  return (
    <Styled.Container onBlur={handleLostFocus} tabIndex={0}>
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
      <Styled.PickerContainer display={showSelector}>
        <BlockPicker color={color} onChangeComplete={(e) => onChange(e.hex)} />
      </Styled.PickerContainer>
    </Styled.Container>
  );
};

export default ColorInput;
