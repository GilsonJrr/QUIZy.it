import React, { FC } from "react";
import * as Styled from "./styled";

type ProgressBarProps = {
  progress: number;
  radius?: number;
  color?: string;
  displayPercentage?: boolean;
};

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  radius = 50,
  color,
  displayPercentage = true,
}) => {
  return (
    <Styled.ProgressBar radius={radius} progressNull={progress === 0}>
      <Styled.ProgressBarFill
        progress={progress}
        radius={radius}
        color={color}
        progressNull={progress === 0}
      >
        {displayPercentage && `${progress.toFixed(0)}%`}
      </Styled.ProgressBarFill>
      <Styled.Empty>0%</Styled.Empty>
    </Styled.ProgressBar>
  );
};

export default ProgressBar;
