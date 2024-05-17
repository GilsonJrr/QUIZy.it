import React, { FC } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";

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
        <Styled.Title>{name}</Styled.Title>
        <Styled.Label>{socialNetWork}</Styled.Label>
      </Styled.HeaderContainer>
      <Styled.InfosContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.BirthDate />
          </Styled.TagBackGround>
          <Styled.Text>{birthDate}</Styled.Text>
        </Styled.InfoTagContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.Email />
          </Styled.TagBackGround>
          <Styled.Text>{email}</Styled.Text>
        </Styled.InfoTagContainer>
        <Styled.InfoTagContainer>
          <Styled.TagBackGround>
            <Styled.Phone />
          </Styled.TagBackGround>
          <Styled.Text>{phone}</Styled.Text>
        </Styled.InfoTagContainer>
      </Styled.InfosContainer>
      <Styled.AboutContainer>
        <Styled.Label>About</Styled.Label>
        <Styled.Paragraph>{about}</Styled.Paragraph>
      </Styled.AboutContainer>
      <Styled.ButtonContainer>
        <Button
          onClick={() => navigate(`/students/student-create?id=${uid}`)}
          width="100%"
        >
          See More
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default ProfileInfo;
