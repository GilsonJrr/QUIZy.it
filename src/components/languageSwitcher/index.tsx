import React, { FC, useState } from "react";
import * as Styled from "./styled";
import { useTranslation } from "react-i18next";
import Button from "components/Button";
import Tooltip from "components/Tooltip";

type LanguageSwitcherProps = {};

const LanguageSwitcher: FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();
  const [showSelector, setShowSelector] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n
      .changeLanguage(lng)
      .then(() => {})
      .catch((error) => {});
    setShowSelector(!showSelector);
  };

  const activeIcon = () => {
    switch (true) {
      case i18n.language === "en":
        return <Styled.USIcon />;
      case i18n.language === "pt":
        return <Styled.BRIcon />;
    }
  };

  const toolTipContent = () => {
    return (
      <Styled.OptionsContainer>
        <Button
          onClick={() => changeLanguage("pt")}
          variant="anchor-dark"
          padding="0"
          size="small"
        >
          <Styled.BRIcon />
          Português
        </Button>
        <Button
          onClick={() => changeLanguage("en")}
          variant="anchor-dark"
          padding="0"
          size="small"
        >
          <Styled.USIcon />
          English
        </Button>
      </Styled.OptionsContainer>
    );
  };

  return (
    <Tooltip toolTipContent={toolTipContent()} position="top">
      {activeIcon()}
    </Tooltip>
  );
};

export default LanguageSwitcher;
