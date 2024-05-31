import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import { useTheme } from "lib/styles/Theme";

type ThemeToggleProps = {};

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  const [active, setActive] = useState(false);

  const handleToggle = () => {
    toggleTheme();
    setActive(!active);
  };

  useEffect(() => {
    if (isDarkMode) {
      setActive(true);
    }
  }, [isDarkMode]);

  return (
    <Styled.Container onClick={() => handleToggle()} active={active}>
      <Styled.Toggle>
        {active ? <Styled.Moon size={30} /> : <Styled.Sum size={30} />}
      </Styled.Toggle>
    </Styled.Container>
  );
};

export default ThemeToggle;
