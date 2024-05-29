import React, { FC, useEffect, useRef, useState } from "react";
import * as Styled from "./styled";
import Button from "components/Button";
import { LinkText, Paragraph } from "components/ui/Typography/styled";
import TextAreaInput from "components/inputs/TextAreaInput";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { linkConverter } from "utils/index";
import { useDispatch } from "react-redux";
import {
  chatCleanUp,
  chatListCleanUp,
  requestChatList,
  setChat,
} from "Store/chat/actions";
import { ChatTypeValues } from "Store/chat/types";
import Avatar from "components/Avatar";
import { requestStudent } from "Store/students/actions";
import { requestTutorPhoto } from "Store/user/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerCard } from "components/Container/styled";
// import { setAlert } from "Store/alert/actions";

type ChatProps = {
  tutorUid: string;
  studentUid: string;
  userType: "tutor" | "student";
};

const Chat: FC<ChatProps> = ({ tutorUid, studentUid, userType }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const { chats, isLoading: chatLoading } = useSelector(
    (state: RootState) => state.chat
  );
  const {
    user,
    tutorInfo,
    isLoading: userLoading,
  } = useSelector((state: RootState) => state.user);
  const { student, isLoading } = useSelector(
    (state: RootState) => state.student
  );

  const [message, setMessage] = useState("");
  const [newMessageCounter, setNewMessageCounter] = useState(1);
  const [messages, setMessages] = useState<ChatTypeValues[]>();

  const handleSendMessage = () => {
    if (!message) return;
    setNewMessageCounter(newMessageCounter + 1);
    const name = userType === "tutor" ? user?.info?.name : student?.info?.name;

    const preparedData = {
      tutorUid: tutorUid,
      studentUid: studentUid || "",
      chatUid:
        chats && chats?.length > 0
          ? String(Number(chats[chats?.length - 1].chatUid) + 1)
          : "0",
      message: message,
      from: userType,
      date: Date.now(),
    };

    const preparedInfo = {
      tutorUid: tutorUid,
      studentUid: studentUid || "",
      // infoUid: idGenerator(18),
      type: "chat",
      message: `you have ${newMessageCounter} new messages from ${name}`,
      quantity: 1,
      senderName: name,
      senderUid: userType === "tutor" ? tutorUid : studentUid,
      open: false,
      userType: userType,
    };
    dispatch(setChat(preparedData));
    // dispatch(setAlert(preparedInfo));

    // TODO: criar um dispache que:
    // se vinher do tutor seta para uma aluno algo como:
    // student/alert/: {"5 new mensages"}
    // se vinher do aluno seta para uma aluno algo como:
    // tutor/alert/: {"5 new mensages from {nome do aluno}"}

    setMessage("");
  };

  useEffect(() => {
    if (chats === undefined) {
      dispatch(requestChatList({ tutorUid: tutorUid, studentUid: studentUid }));
    }
    if (tutorInfo === undefined) {
      dispatch(requestTutorPhoto({ uid: tutorUid }));
    }
  }, [chats, dispatch, studentUid, tutorInfo, tutorUid]);

  useEffect(() => {
    dispatch(requestStudent({ uid: tutorUid, studentId: studentUid }));
  }, [dispatch, studentUid, tutorUid]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chats && chats.length > 0) {
      setMessages(chats);
    }
  }, [chats]);

  useEffect(() => {
    return () => {
      dispatch(chatCleanUp());
      dispatch(chatListCleanUp());
    };
  }, [dispatch]);

  if (isLoading || userLoading || chatLoading) {
    return (
      <LoadingContainerCard>
        <LoadingSpinner />
      </LoadingContainerCard>
    );
  }

  return (
    <Styled.Content>
      <Styled.ChatContainer ref={chatContainerRef}>
        {messages?.map((message) => {
          const preparedText = linkConverter(message.message || "");
          return (
            <Styled.MessageContainer user={userType === message.from}>
              {userType !== message.from && (
                <Styled.AvatarContainer>
                  <Avatar
                    name={
                      userType === "tutor"
                        ? student?.info?.name
                        : tutorInfo?.name
                    }
                    photo={
                      userType === "tutor"
                        ? student?.info?.photo
                        : tutorInfo?.photo
                    }
                    size="small"
                  />
                </Styled.AvatarContainer>
              )}
              <Styled.Message user={userType === message.from}>
                {preparedText.type === "text" ? (
                  <Paragraph
                    multiLine
                    color={userType === message.from ? "default" : "light"}
                    size="small"
                  >
                    {preparedText.label}
                  </Paragraph>
                ) : (
                  <LinkText
                    href={preparedText.link}
                    target="_blank"
                    size="small"
                  >
                    {preparedText.label}
                  </LinkText>
                )}
              </Styled.Message>
              {userType === message.from && (
                <Styled.AvatarContainer>
                  <Avatar
                    name={user?.info?.name || student?.info?.name}
                    photo={user?.info?.photo || student?.info?.photo}
                    size="small"
                  />
                </Styled.AvatarContainer>
              )}
            </Styled.MessageContainer>
          );
        })}
      </Styled.ChatContainer>
      <Styled.ButtonContainer>
        <Styled.MessageTextContainer>
          <TextAreaInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
            height="10vh"
          />
        </Styled.MessageTextContainer>
        <Button onClick={handleSendMessage} width="100%" align="center">
          Send
        </Button>
      </Styled.ButtonContainer>
    </Styled.Content>
  );
};

export default Chat;
