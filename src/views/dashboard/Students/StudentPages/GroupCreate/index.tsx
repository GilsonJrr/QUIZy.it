import React, { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { GroupCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { idGenerator } from "utils/index";
import { removeGroup, requestGroupList, setGroup } from "Store/group/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Avatar from "components/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
type StudentCreateProps = {};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
};

const GroupCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const groupId = new URLSearchParams(location.search).get("id");

  const { groups } = useSelector((state: RootState) => state.groupReducer);
  const { students } = useSelector((state: RootState) => state.studentReducer);

  const userID = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TStudent>({
    resolver: yupResolver(GroupCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    console.log("data", data);
    const preparedData = {
      id: groupId !== null ? groupId : idGenerator(18),
      uid: userID || "",
      userType: "student",
      ...data,
    };

    dispatch(setGroup(preparedData));
    navigate("/students");
  };

  useEffect(() => {
    if (groups === undefined && userID) {
      dispatch(requestGroupList({ uid: userID }));
    }
  }, [dispatch, groups, userID]);

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: groupId !== null ? "Edit Group" : "Add Group", path: "" },
  ];

  useEffect(() => {
    if (groupId !== null && groups) {
      reset(...groups?.filter((g) => g.id === groupId));
    }
  }, [groupId, groups, reset]);

  const hasStudent = useMemo(() => {
    return students?.some(
      (a) => a.info?.group === groups?.filter((g) => g.id === groupId)[0]?.title
    );
  }, [groupId, groups, students]);

  const handleDelete = () => {
    dispatch(removeGroup({ uid: userID || "", groupId: groupId || "" }));
    navigate("/students");
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.ContainerInner>
        <Card title={"New Group"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
              label={"Group Title"}
              placeholder="Enter the group title"
              error={
                hasStudent
                  ? {
                      type: "custom",
                      message:
                        "Group has active student, name can't be changed",
                    }
                  : errors.title
              }
              {...register("title")}
              disabled={hasStudent}
            />
            <SimpleInput
              label={"Group image"}
              placeholder="Enter the group image"
              error={errors.image}
              {...register("image")}
            />
            <TextAreaInput
              label="About"
              height="40vh"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        </Card>
        <Card title={"All Groups"} isEmpty={false} gridName="newQuestion">
          <Styled.GroupCardContainer>
            {groups &&
              groups.length > 0 &&
              groups?.map((group) => {
                return (
                  <Styled.GroupCard
                    active={group.id === groupId}
                    onClick={() =>
                      navigate(`/students/group-create?id=${group.id}`)
                    }
                  >
                    <Avatar
                      size="medium"
                      name={group.title}
                      photo={group.image}
                    />
                    <Styled.GroupTitle>{group.title}</Styled.GroupTitle>
                  </Styled.GroupCard>
                );
              })}
          </Styled.GroupCardContainer>
        </Card>
        <Styled.ButtonContainer
          justify={
            groupId !== null && !hasStudent ? "space-between" : "flex-end"
          }
        >
          {groupId !== null && !hasStudent && (
            <Styled.DeleteButton
              type="button"
              disabled={hasStudent}
              onClick={handleDelete}
            >
              Delete Group
            </Styled.DeleteButton>
          )}
          <Styled.SubmitButton type="submit" form="newStudentForm">
            {groupId !== null ? "Update Group" : "Add Group"}
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default GroupCreate;
