import React, { FC } from "react";
import * as Styled from "./styled";
import { useLocation, useNavigate } from "react-router-dom";

type QuizResultProps = {};

const QuizResult: FC<QuizResultProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, amount = 0 } = location.state;
  const finalScore = (score * 100) / amount;

  const handleResults = () => {
    navigate("/results");
  };

  const handleMessage = () => {
    switch (true) {
      case finalScore <= 30:
        return `Uh-oh! It appears there's a bit of a stumble here. But fret not! Every 
                misstep is just another opportunity to learn and grow. Take a breather, 
                review the material, and gear up for round two!`;
      case finalScore <= 50:
        return `Not quite there yet, but hey, progress is progress! Keep your chin up and 
                your determination strong. Reflect on what you've encountered, regroup, 
                and charge ahead with renewed vigor!`;
      case finalScore <= 80:
        return `You're making strides, but there's still a bit more ground to cover. Don't 
                let this deter you; instead, let it fuel your determination. Keep pushing 
                forward, keep striving for excellence. You're closer than you think!`;
      case finalScore === 100:
        return `Bravo! You absolutely aced it! Perfect score, perfect performance! Your 
                unwavering dedication and hard work have truly paid off. Keep shining brightly 
                and tackling challenges with that unbeatable spirit!`;
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>Your score</Styled.Title>
      <Styled.Score>{finalScore.toFixed(0)}%</Styled.Score>
      <Styled.ScoreMessage>{handleMessage()}</Styled.ScoreMessage>
      <Styled.Button onClick={handleResults}>Go to results</Styled.Button>
    </Styled.Container>
  );
};

export default QuizResult;
