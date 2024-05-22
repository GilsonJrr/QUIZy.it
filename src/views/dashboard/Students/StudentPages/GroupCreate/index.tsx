import React, { FC, useEffect, useMemo, useState } from "react";
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
import { useModalContext } from "components/Modal/modalContext";
import DeleteModal from "components/Modal/DeleteModal";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import Button from "components/Button";
import AlertModal from "components/Modal/AlertModal";
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
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const groupId = new URLSearchParams(location.search).get("id");

  const { groups } = useSelector((state: RootState) => state.group);
  const { students } = useSelector((state: RootState) => state.student);
  const { user } = useSelector((state: RootState) => state.user);

  const userID = user?.info?.uid;

  const [tab, setTab] = useState("Group");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TStudent>({
    resolver: yupResolver(GroupCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    if (groups && groups?.length >= 10) {
      return handleModal(
        <AlertModal
          type="warning"
          title="Group Creation Limit"
          totalTime={6000}
          message={`You have reached the maximum number of groups you can create. 
          Please delete an existing group or contact support for assistance.`}
        />
      );
    }
    const preparedData = {
      id: groupId !== null ? groupId : idGenerator(18),
      uid: userID || "",
      userType: "student",
      ...data,
    };

    dispatch(
      setGroup(preparedData, () =>
        handleModal(
          <AlertModal
            type={"success"}
            message={
              groupId !== null
                ? "Group update successfully"
                : "Group created successfully"
            }
          />
        )
      )
    );
    navigate("/students");
  };

  useEffect(() => {
    if (groups === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
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
    handleModal(
      <DeleteModal
        deleteTitle={watch("title") || ""}
        onDelete={() => {
          dispatch(
            removeGroup({ uid: userID || "", groupId: groupId || "" }, () =>
              handleModal(
                <AlertModal type={"info"} message={"Group Removed"} />
              )
            )
          );
          navigate("/students");
        }}
      />
    );
  };

  const handleUpdateCategory = (id: string) => {
    const emptyState = {
      title: "",
      about: "",
      image: "",
    };
    if (id === groupId) {
      navigate(`/students/group-create`);
      setTab("Group");
      reset(emptyState);
    } else {
      navigate(`/students/group-create?id=${id}`);
      setTab("Group");
    }
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: "Group" }, { label: "Groups" }]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
            active={tab}
          />
        </Styled.TabContainer>
      )}
      <Styled.ContainerInner>
        {(!isMobile || tab === "Group") && (
          <Card
            title={isMobile ? "" : "New Group"}
            isEmpty={false}
            gridName="newQuiz"
            innerCard={isMobile}
          >
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
        )}
        {(!isMobile || tab === "Groups") && (
          <Card
            title={isMobile ? "" : "All Groups"}
            isEmpty={false}
            gridName="newQuestion"
            innerCard={isMobile}
          >
            <Styled.GroupCardContainer>
              {groups &&
                groups.length > 0 &&
                groups?.map((group) => {
                  return (
                    <Styled.GroupCard
                      active={group.id === groupId}
                      onClick={() => handleUpdateCategory(group.id || "")}
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
        )}
        <Styled.ButtonContainer
          justify={
            groupId !== null && !hasStudent ? "space-between" : "flex-end"
          }
        >
          {groupId !== null && !hasStudent && (
            <Button
              type="button"
              disabled={hasStudent}
              onClick={handleDelete}
              variant="danger"
            >
              {isMobile ? "Delete" : "Delete Group"}
            </Button>
          )}
          <Button type="submit" form="newStudentForm">
            {groupId !== null ? "Update " : "Add "} {isMobile ? "" : "Group"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default GroupCreate;
