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
import { removeAlert, setAlert } from "Store/alert/actions";
import { useLocation } from "react-router-dom";
import { IoSend } from "react-icons/io5";

type ChatProps = {
  tutorUid: string;
  studentUid: string;
  userType: "tutor" | "student";
};

const Chat: FC<ChatProps> = ({ tutorUid, studentUid, userType }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const openChat = new URLSearchParams(location.search).get("chat");

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
  const [rows, setRows] = useState(1);

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
      type: "chat",
      message: `you have new messages from ${name}`,
      quantity: 1,
      senderName: name,
      senderUid: userType === "tutor" ? tutorUid : studentUid,
      open: false,
      userType: userType,
    };
    dispatch(setChat(preparedData));
    dispatch(setAlert(preparedInfo));

    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lineHeight = 26;
    const previousRows = e.target.rows;
    e.target.rows = 1;

    const currentRows = Math.floor(e.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= 5) {
      e.target.rows = 5;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < 5 ? currentRows : 5);
    setMessage(e.target.value);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (tutorInfo === undefined) {
      dispatch(requestTutorPhoto({ uid: tutorUid }));
    }
  }, [dispatch, tutorInfo, tutorUid]);

  useEffect(() => {
    dispatch(requestStudent({ uid: tutorUid, studentId: studentUid }));
  }, [dispatch, studentUid, tutorUid]);

  useEffect(() => {
    dispatch(requestChatList({ tutorUid: tutorUid, studentUid: studentUid }));
  }, [dispatch, studentUid, tutorUid, openChat]);

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

  useEffect(() => {
    if (userType === "tutor") {
      dispatch(
        removeAlert({
          userType: "tutor",
          alertUid: studentUid,
          tutorUid: tutorUid || "",
        })
      );
      return;
    }
    if (userType === "student") {
      dispatch(
        removeAlert({
          userType: "student",
          studentUid: studentUid,
          alertUid: tutorUid,
          tutorUid: tutorUid || "",
        })
      );
      return;
    }
  }, [dispatch, studentUid, tutorUid, userType]);

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
                  <Paragraph multiLine color={"light"} size="small">
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
            onChange={(e) => handleChange(e)}
            size="small"
            rows={rows}
          />
        </Styled.MessageTextContainer>
        <Styled.ButtonInnerContainer>
          <Button onClick={handleSendMessage} align="center" padding="13px">
            <IoSend />
          </Button>
        </Styled.ButtonInnerContainer>
      </Styled.ButtonContainer>
    </Styled.Content>
  );
};

export default Chat;
