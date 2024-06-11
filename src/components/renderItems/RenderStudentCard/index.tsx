import React, { FC } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";
import { Title } from "components/ui/Typography/styled";
import { useDispatch } from "react-redux";
import { requestStudent } from "Store/students/actions";

type RenderStudentCardProps = {
  item: StudentTypeValues;
  width?: string;
  onClick: () => void;
};

const RenderStudentCard: FC<RenderStudentCardProps> = ({
  item,
  width,
  onClick,
}) => {
  const navigate = useNavigate();
  const isMobile = useDeviceType();
  const dispatch = useDispatch();

  const handleStudent = () => {
    dispatch(requestStudent({ uid: item.tutorID || "", studentId: item.uid }));
    onClick();
  };

  return (
    <Styled.Container
      width={width}
      onClick={() => handleStudent()}
      // onClick={() =>
      //   navigate(`/students/student-profile?studentId=${item.uid}`)
      // }
    >
      <Avatar size="big" name={item.name} photo={item.photo} />
      <Styled.InfoContainer>
        <Title>{item.name}</Title>
        <Styled.InnerInfoContainer>
          {item.group && (
            <Title size="smaller" fontWeight="normal">
              Group: {item.group}{" "}
            </Title>
          )}
          {item.average && (
            <Title size="smaller" fontWeight="normal">
              | Average:
              {item.average}
            </Title>
          )}
        </Styled.InnerInfoContainer>
        {item.phone && (
          <Title size="smaller" fontWeight="normal">
            Phone: {item.phone}
          </Title>
        )}
        <Title size="smaller" fontWeight="normal">
          Email: {item.email}
        </Title>
      </Styled.InfoContainer>
      {!isMobile && (
        <Styled.ButtonContainer>
          <Styled.ActionButton>
            <Styled.Arrow size={20} />
          </Styled.ActionButton>
        </Styled.ButtonContainer>
      )}
    </Styled.Container>
  );
};

export default RenderStudentCard;
