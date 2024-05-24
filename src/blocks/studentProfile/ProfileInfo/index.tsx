import React, { FC, useState } from "react";
import * as Styled from "./styled";
import { StudentTypeValues } from "Store/students/types";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import { Paragraph, Title } from "components/ui/Typography/styled";
import Tabs from "components/Tabs";
import TextAreaInput from "components/inputs/TextAreaInput";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type ProfileInfoProps = {
  student: StudentTypeValues;
};

const ProfileInfo: FC<ProfileInfoProps> = ({ student }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState("Profile");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { message: "ola tudo bem", from: "uBG7yOgQ3IcZzJspg5VL4W4Rppr2" },
    { message: "Opa blz", from: "mbTSo9y4fAb3oy0fHbapR7fsVEZ2" },
    { message: "vc ta pronto?", from: "mbTSo9y4fAb3oy0fHbapR7fsVEZ2" },
  ]);

  const { photo, name, socialNetWork, birthDate, email, phone, about, uid } =
    student;

  const handleSendMessage = () => {
    setMessages([
      ...messages,
      { message: message, from: user?.info?.uid || "" },
    ]);
    setMessage("");
  };

  return (
    <Styled.Container>
      {/* <Styled.TabContainer>
        <Tabs
          tabs={[{ label: "Profile" }, { label: "Chat" }]}
          activeTab={(tab) => setTab(tab)}
          radius={10}
        />
      </Styled.TabContainer> */}
      {tab === "Profile" && (
        <Styled.Content>
          <Avatar name={name} photo={photo} size="big" />
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
              Edit
            </Button>
          </Styled.ButtonContainer>
        </Styled.Content>
      )}
      {tab === "Chat" && (
        <Styled.Content>
          <Styled.ChatContainer>
            {messages.map((message) => {
              return (
                <Styled.MessageContainer
                  user={user?.info?.uid === message.from}
                >
                  <Styled.Message user={user?.info?.uid === message.from}>
                    <Title
                      multiLine
                      color={
                        user?.info?.uid === message.from ? "default" : "light"
                      }
                    >
                      {message.message}
                    </Title>
                  </Styled.Message>
                </Styled.MessageContainer>
              );
            })}
          </Styled.ChatContainer>
          <Styled.ButtonContainer>
            <Styled.MessageTextContainer>
              <TextAreaInput
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Styled.MessageTextContainer>
            <Button onClick={handleSendMessage} width="100%" align="center">
              Send
            </Button>
          </Styled.ButtonContainer>
        </Styled.Content>
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
