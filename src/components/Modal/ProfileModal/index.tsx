import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";

import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { updateStudent } from "Store/students/actions";
import { setUser } from "Store/user/actions";

import Avatar from "components/Avatar";
import { useModalContext } from "../modalContext";
import SimpleInput from "components/inputs/SimpleInput";
import { TStudent } from "views/dashboard/Students/StudentPages/StudentCreate";

import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import Button from "components/Button";
import { setImgStudent, setImgUser } from "Store/user/repository";
import { UseData, UserPhoto } from "Store/user/types";
import FileInput from "components/inputs/FileInput";

type ExampleProps = {};

const ProfileModal: FC<ExampleProps> = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, watch, setValue } = useForm<TStudent>(
    {}
  );

  const { handleModal } = useModalContext();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const { student } = useSelector((state: RootState) => state.student);

  const [editMode, setEditMode] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const tutorInfo = user?.info || ([] as unknown as UseData);
  const studentInfo = student?.info || ([] as unknown as UseData);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    handleModal("");
  };

  // console.log("data", tutorInfo, studentInfo);

  const onSubmit = (data: TStudent) => {
    handleModal("");

    console.log("data", data);

    if (data.userType === "student") {
      return dispatch(updateStudent(data));
    }
    if (data.userType === "tutor") {
      return dispatch(setUser(data));
    }
  };

  const userType = tutorInfo.userType || studentInfo.userType;

  useEffect(() => {
    if (userType === "tutor") {
      reset(tutorInfo);
      setValue("photo", tutorInfo.photo ? tutorInfo.photo : "");
      setValue("birthDate", tutorInfo.birthDate ? tutorInfo.birthDate : "");
      setValue(
        "socialNetWork",
        tutorInfo.socialNetWork ? tutorInfo.socialNetWork : ""
      );
      return;
    }
    if (userType === "student") {
      reset(studentInfo);
      setValue("photo", studentInfo.photo ? studentInfo.photo : "");
      setValue("birthDate", studentInfo.birthDate ? studentInfo.birthDate : "");
      setValue(
        "socialNetWork",
        studentInfo.socialNetWork ? studentInfo.socialNetWork : ""
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quizImageData: UserPhoto = {
      uid: watch("uid") || "",
      tutorUid: watch("tutorID" || ""),
      photo: (event.target.files?.[0] as unknown as string) || "",
    };
    setLoadingImage(true);
    if (userType === "tutor") {
      setImgUser(quizImageData).then(({ pic, loading }) => {
        setLoadingImage(loading);
        setValue("photo", pic);
      });
      return;
    }
    if (userType === "student") {
      setImgStudent(quizImageData).then(({ pic, loading }) => {
        setLoadingImage(loading);
        setValue("photo", pic);
      });
      return;
    }
  };

  if (isLoading || watch("name") === undefined) {
    return (
      <Styled.Container onClick={handleContainerClick}>
        <Styled.Content onClick={(event) => event.stopPropagation()}>
          <LoadingContainerCard>
            <LoadingSpinner size="medium" />
          </LoadingContainerCard>
        </Styled.Content>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container onClick={handleContainerClick}>
      <Styled.Content onClick={(event) => event.stopPropagation()}>
        <Styled.IconContainer onClick={handleContainerClick}>
          <Styled.ChevronRight size={18} />
        </Styled.IconContainer>
        <Styled.ProfileEditContainer
          id="profileUpdate"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Styled.AvatarContainer editMode={editMode}>
            <Avatar
              name={watch("name")}
              photo={watch("photo")}
              size={editMode ? "big" : "bigger"}
            />
            {editMode && (
              <Styled.PhotoButtonContainer>
                <FileInput
                  placeholder="Enter the student photo"
                  {...register("photo")}
                  onChange={handleUploadPhoto}
                  iconOnly
                  loading={loadingImage}
                />
              </Styled.PhotoButtonContainer>
            )}
          </Styled.AvatarContainer>
          <Styled.Spacer editMode={editMode} />
          <SimpleInput
            label="Name"
            viewMode={!editMode}
            disabled={!editMode}
            {...register("name")}
          />
          <SimpleInput
            label="Email"
            disabled
            viewMode={!editMode}
            {...register("email")}
          />
          <SimpleInput
            label="Phone"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("phone")}
          />
          <SimpleInput
            label="Birth"
            type="date"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("birthDate")}
          />
          <SimpleInput
            label="Social"
            disabled={!editMode}
            viewMode={!editMode}
            {...register("socialNetWork")}
          />
          <SimpleInput
            label="Type"
            disabled
            viewMode={!editMode}
            {...register("userType")}
          />
        </Styled.ProfileEditContainer>
        <Styled.ButtonContainer>
          <Button
            onClick={handleClick}
            type={!editMode ? "submit" : "button"}
            form={!editMode ? "profileUpdate" : "none"}
            width="100%"
            disabled={loadingImage}
          >
            <Styled.ButtonText>
              {editMode ? "Update Profile" : "Edit"}
            </Styled.ButtonText>
          </Button>
        </Styled.ButtonContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default ProfileModal;
