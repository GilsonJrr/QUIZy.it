import React, { FC } from "react";
import * as Styled from "./styled";
import { TStudentList } from "types/index";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";

type RenderStudentCardProps = {
  item: TStudentList;
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
      <Styled.PhotoContainer src={item.Photo ? item.Photo : EmptyImage} />
      <Styled.InfoContainer>
        <Styled.Name>{item.Name}</Styled.Name>
        <Styled.InnerInfoContainer>
          <Styled.Info>Group: {item.Group} | </Styled.Info>
          <Styled.Info> Average: {item.Average}</Styled.Info>
        </Styled.InnerInfoContainer>
        <Styled.Contact>Phone: {item.Phone}</Styled.Contact>
        <Styled.Contact>Email: {item.Email}</Styled.Contact>
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
