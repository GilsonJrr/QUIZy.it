import React, { FC } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import { Paragraph, Title } from "components/ui/Typography/styled";

type ProfileInfoProps = {
  student: StudentTypeValues;
};

const ProfileInfo: FC<ProfileInfoProps> = ({ student }) => {
  const navigate = useNavigate();
  const { photo, name, socialNetWork, birthDate, email, phone, about, uid } =
    student;

  return (
    <Styled.Container>
      <Avatar name={name} photo={photo} size="bigger" />
      <Styled.HeaderContainer>
        <Title>{name}</Title>
        <Title size="smaller">{socialNetWork}</Title>
      </Styled.HeaderContainer>
      <Styled.InfosContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.BirthDate />
          </Styled.TagBackGround>
          <Title size="small">{birthDate}</Title>
        </Styled.InfoTagContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.Email />
          </Styled.TagBackGround>
          <Title size="small">{email}</Title>
        </Styled.InfoTagContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.Phone />
          </Styled.TagBackGround>
          <Title size="small">{phone}</Title>
        </Styled.InfoTagContainer>
      </Styled.InfosContainer>
      <Styled.AboutContainer>
        <Title size="small">About</Title>
        <Paragraph size="smaller">{about}</Paragraph>
      </Styled.AboutContainer>
      <Styled.ButtonContainer>
        <Button
          onClick={() => navigate(`/students/student-create?id=${uid}`)}
          width="100%"
          align="center"
        >
          See More
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default ProfileInfo;
