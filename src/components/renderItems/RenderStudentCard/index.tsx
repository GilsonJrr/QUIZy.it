import React, { FC } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";

type RenderStudentCardProps = {
  item: StudentTypeValues;
  width?: string;
};

const RenderStudentCard: FC<RenderStudentCardProps> = ({ item, width }) => {
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  return (
    <Styled.Container
      width={width}
      onClick={() =>
        navigate(`/students/student-profile?studentId=${item.uid}`)
      }
    >
      <Avatar size="big" name={item.name} photo={item.photo} />
      <Styled.InfoContainer>
        <Styled.Name>{item.name}</Styled.Name>
        <Styled.InnerInfoContainer>
          {item.group && <Styled.Info>Group: {item.group} </Styled.Info>}
          {item.average && (
            <Styled.Info>
              | Average:
              {item.average}
            </Styled.Info>
          )}
        </Styled.InnerInfoContainer>
        {item.phone && <Styled.Contact>Phone: {item.phone}</Styled.Contact>}
        <Styled.Contact>Email: {item.email}</Styled.Contact>
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
