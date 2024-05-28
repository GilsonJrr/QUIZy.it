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
  setOpenStudentChat,
} from "Store/chat/actions";
import { ChatTypeValues } from "Store/chat/types";

type ChatProps = {
  tutorUid: string;
  studentUid: string;
  userType: "tutor" | "student";
};

const Chat: FC<ChatProps> = ({ tutorUid, studentUid, userType }) => {
  const dispatch = useDispatch();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const { chats } = useSelector((state: RootState) => state.chat);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatTypeValues[]>();

  const handleSendMessage = () => {
    if (!message) return;

    const preparedData = {
      tutorUid: tutorUid,
      studentUid: studentUid || "",
      chatUid: String(chats?.length) || "0",
      message: message,
      from: userType,
      date: Date.now(),
      read: false,
      newStudentChat: true,
      newTutorChat: true,
    };
    dispatch(setChat(preparedData));
    setMessage("");
  };

  useEffect(() => {
    dispatch(requestChatList({ tutorUid: tutorUid, studentUid: studentUid }));
    dispatch(setOpenStudentChat({ tutorUid: tutorUid, studentUid: studentUid, newStudentChat: false, }))
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

  return (
    <Styled.Content>
      <Styled.ChatContainer ref={chatContainerRef}>
        {messages?.map((message) => {
          const preparedText = linkConverter(message.message || "");
          return (
            <Styled.MessageContainer user={userType === message.from}>
              <Styled.Message user={userType === message.from}>
                {preparedText.type === "text" ? (
                  <Paragraph
                    multiLine
                    color={userType === message.from ? "default" : "light"}
                  >
                    {preparedText.label}
                  </Paragraph>
                ) : (
                  <LinkText href={preparedText.link} target="_blank">
                    {preparedText.label}
                  </LinkText>
                )}
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
  );
};

export default Chat;
