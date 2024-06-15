import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
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
import { useNavigate } from "react-router-dom";
import { useModalContext } from "components/Modal/modalContext";
import DeleteModal from "components/Modal/DeleteModal";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import Button from "components/Button";
import AlertModal from "components/Modal/AlertModal";
import { Title } from "components/ui/Typography/styled";
import ColorInput from "components/inputs/ColorInput";

type StudentCreateProps = {
  onClick?: () => void;
};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
  color?: string;
};

const GroupCreate: FC<StudentCreateProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { groups } = useSelector((state: RootState) => state.group);
  const { students } = useSelector((state: RootState) => state.student);
  const { user } = useSelector((state: RootState) => state.user);

  const userID = user?.info?.uid;

  const [tab, setTab] = useState("Group");
  const [groupId, setGroupId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
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
      id: groupId !== "" ? groupId : idGenerator(18),
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
              groupId !== ""
                ? "Group update successfully"
                : "Group created successfully"
            }
          />
        )
      )
    );
    onClick?.();
  };

  useEffect(() => {
    if (groups === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
    }
  }, [dispatch, groups, userID]);

  useEffect(() => {
    if (groupId !== "" && groups && groups.length > 0) {
      reset(...groups?.filter((g) => g.id === groupId));
    }
  }, [groupId, groups, reset]);

  const hasStudent = useMemo(() => {
    if (groups && groups.length > 0) {
      return students?.some(
        (a) =>
          a.info?.group === groups?.filter((g) => g.id === groupId)[0]?.title
      );
    }
  }, [groupId, groups, students]);

  const handleDelete = () => {
    handleModal(
      <DeleteModal
        deleteTitle={watch("title") || ""}
        onDelete={() => {
          dispatch(
            removeGroup({ uid: userID || "", groupId: groupId || "" }, () =>
              handleModal(
                <AlertModal type={"default"} message={"Group Removed"} />
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
      setGroupId("");
      setTab("Group");
      reset(emptyState);
    } else {
      setGroupId(id);
      setTab("Group");
    }
  };

  console.log("groupId", groupId);

  return (
    <Styled.Container>
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
          <Styled.Form id="newGroupForm" onSubmit={handleSubmit(onSubmit)}>
            <Styled.NameColorContainer>
              <SimpleInput
                maxLength={15}
                label={"Group Title"}
                placeholder="Enter the group title"
                error={
                  watch("title")?.length === 15
                    ? {
                        type: "custom",
                        message: "Character limit reached! 15/15",
                      }
                    : hasStudent
                    ? {
                        type: "custom",
                        message: "Group has active student, can't be changed",
                      }
                    : errors.title
                }
                {...register("title")}
                disabled={hasStudent}
              />
              <ColorInput
                color={watch("color") || ""}
                onChange={(color) => setValue("color", color)}
              />
            </Styled.NameColorContainer>
            {/* <Styled.TextAreaContainer>
            </Styled.TextAreaContainer> */}
            <TextAreaInput
              label="About"
              height="100%"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        )}
        {(!isMobile || tab === "Groups") && (
          <Card
            title={"All Groups"}
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
                        border={group.color || " "}
                      />
                      <Title color={group.id === groupId ? "light" : "default"}>
                        {group.title}
                      </Title>
                    </Styled.GroupCard>
                  );
                })}
            </Styled.GroupCardContainer>
          </Card>
        )}
        <Styled.ButtonContainer
          justify={groupId !== "" && !hasStudent ? "space-between" : "flex-end"}
        >
          {groupId !== "" && !hasStudent && (
            <Button
              type="button"
              disabled={hasStudent}
              onClick={handleDelete}
              variant="danger"
            >
              {isMobile ? "Delete" : "Delete Group"}
            </Button>
          )}
          <Button type="submit" form="newGroupForm">
            {groupId !== "" ? "Update " : "Add "} {isMobile ? "" : "Group"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default GroupCreate;
