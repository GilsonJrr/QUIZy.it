import React, { FC } from "react";
import * as Styled from "./styled";

type ProgressBarProps = { progress: number; radius?: number };

const ProgressBar: FC<ProgressBarProps> = ({ progress, radius = 50 }) => {
  return (
    <Styled.ProgressBar radius={radius}>
      <Styled.ProgressBarFill progress={progress} radius={radius}>
        {progress.toFixed(0)}%
      </Styled.ProgressBarFill>
    </Styled.ProgressBar>
  );
};

export default ProgressBar;
