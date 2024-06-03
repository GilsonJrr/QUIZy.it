import React, { useEffect, useMemo, useState } from "react";
import * as Styled from "../styled";
import Card from "components/Card";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestQuizList } from "Store/quiz/actions";
import { requestMyListList } from "Store/myList/actions";
import { MyListTypeValues } from "Store/myList/types";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import * as Block from "blocks/Dashboard";
import Chat from "components/Chat";
import { Title } from "components/ui/Typography/styled";
import { useNavigate } from "react-router-dom";

export const StudentPage = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);

  const openChat = urlParams.get("chat");

  const { quizzes } = useSelector((state: RootState) => state.quiz);
  const { userStudent } = useSelector((state: RootState) => state.user);
  const { myLists } = useSelector((state: RootState) => state.myList);

  const [tab, setTab] = useState("Quiz");
  const [innerTab, setInnerTab] = useState("List");

  const myList = useMemo(() => {
    if (!quizzes || !Array.isArray(myLists)) {
      return [];
    }
    return quizzes?.filter(
      (item) => myLists && myLists?.includes(item.id as MyListTypeValues)
    );
  }, [myLists, quizzes]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: userStudent?.tutorID || "", size: 50 }));
    }
  }, [dispatch, quizzes, userStudent]);

  useEffect(() => {
    const myListRequest = {
      tutorUid: userStudent?.tutorID || "",
      uid: userStudent?.tutorID || "",
      studentUid: userStudent?.uid || "",
      // quizUid: item?.id,
    };
    if (myLists === undefined) {
      dispatch(requestMyListList(myListRequest));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myLists]);

  useEffect(() => {
    if (openChat) {
      setInnerTab("Chat");
      navigate("/");
    }
  }, [navigate, openChat]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: "Quiz" },
              { label: "List" },
              { label: "Result" },
              { label: "Chat" },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === "Quiz" || !isMobile) && (
        <Block.QuizzesCard gridName="card1" origin />
      )}
      {(tab === "List" || !isMobile) && (
        <Card
          gridName="card3"
          title={innerTab}
          isEmpty={false}
          scrollable={innerTab !== "Chat"}
          innerCard={isMobile}
        >
          {!isMobile && (
            <Tabs
              tabs={[{ label: "List" }, { label: "Chat" }]}
              activeTab={(tab) => setInnerTab(tab)}
              radius={10}
              active={innerTab}
            />
          )}
          {innerTab === "List" &&
            (myList.length > 0 ? (
              myList?.map((list) => {
                return <RenderQuizCard item={list} />;
              })
            ) : (
              <Styled.ChatContainer>
                <Title fontWeight="lighter" multiLine textAlign="center">
                  Your List is empty add quizzes here to do it later or retry it
                </Title>
              </Styled.ChatContainer>
            ))}
          {innerTab === "Chat" && (
            <Styled.ChatContainer>
              <Chat
                tutorUid={userStudent?.tutorID || ""}
                studentUid={userStudent?.uid || ""}
                userType={"student"}
              />
            </Styled.ChatContainer>
          )}
        </Card>
      )}
      {(tab === "Result" || !isMobile) && (
        <Block.ResultsCard gridName="card2" origin />
      )}
      {tab === "Chat" && isMobile && (
        <Styled.ChatContainer>
          <Chat
            tutorUid={userStudent?.tutorID || ""}
            studentUid={userStudent?.uid || ""}
            userType={"student"}
          />
        </Styled.ChatContainer>
      )}
    </Styled.Container>
  );
};
