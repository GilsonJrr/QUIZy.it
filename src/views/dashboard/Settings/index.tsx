import React, { FC } from "react";
import * as Styled from "./styled";
import FeedBack from "components/FeedBack";

type SettingsProps = {};

const Settings: FC<SettingsProps> = () => {
  return (
    <Styled.Container>
      <FeedBack />
    </Styled.Container>
  );
};

export default Settings;
