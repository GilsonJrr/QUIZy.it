import React, { FC } from "react";
import * as Styled from "./styled";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import { StudentTypeValues } from "Store/students/types";

type RenderStudentCardProps = {
  item: StudentTypeValues;
  width?: string;
  onClick?: () => void;
};

const RenderStudentCard: FC<RenderStudentCardProps> = ({
  item,
  width,
  onClick,
}) => {
  return (
    <Styled.Container width={width} onClick={onClick}>
      <Styled.PhotoContainer src={item.photo ? item.photo : EmptyImage} />
      <Styled.InfoContainer>
        <Styled.Name>{item.name}</Styled.Name>
        <Styled.InnerInfoContainer>
          <Styled.Info>Group: {item.group} </Styled.Info>
          {item.average && (
            <Styled.Info>
              | Average:
              {item.average}
            </Styled.Info>
          )}
        </Styled.InnerInfoContainer>
        <Styled.Contact>Phone: {item.phone}</Styled.Contact>
        <Styled.Contact>Email: {item.email}</Styled.Contact>
      </Styled.InfoContainer>
      <Styled.ButtonContainer>
        <Styled.ActionButton>
          <Styled.Arrow size={20} />
        </Styled.ActionButton>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default RenderStudentCard;
