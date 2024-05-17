import React, { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import SelectInput from "components/inputs/SelectInput";
import { TOption } from "types/index";
import { StudentCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import {
  removeStudent,
  requestStudent,
  setStudent,
  updateStudent,
} from "Store/students/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";
import { useModalContext } from "components/Modal/modalContext";
import DeleteModal from "components/Modal/DeleteModal";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
import Button from "components/Button";
import AlertModal from "components/Modal/AlertModal";

type StudentCreateProps = {};

export type TStudent = {
  name: string;
  phone?: string;
  photo?: string;
  email: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  address?: string;
  userType?: string;
  uid?: string;
  tutorID?: string;
};

const StudentCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const studentId = new URLSearchParams(location.search).get("id");

  const { groups } = useSelector((state: RootState) => state.group);
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const { student, students } = useSelector(
    (state: RootState) => state.student
  );
  const userID = user?.info?.uid;

  const [extraFields, setExtraFields] = useState<any[]>([]);
  const [extraField, setExtraField] = useState<string>();
  const [editingField, setEditingField] = useState(0);
  const [tab, setTab] = useState("Information");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
    reset,
    setValue,
  } = useForm<TStudent>({
    resolver: yupResolver(StudentCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    if (students && students?.length >= 20) {
      return handleModal(
        <AlertModal
          type="warning"
          title="Student Limit Reached"
          totalTime={6000}
          message={`You have reached the maximum number of students you can add.
          Please remove an existing student or contact support for assistance.`}
        />
      );
    }
    const { group, ...rest } = data;

    const newStudentData = {
      uid: userID,
      group: data.group === "groupLess" ? "" : data.group,
      userType: "student",
      ...rest,
    };

    const updateStudentData = {
      uid: studentId || "",
      group: data.group === "groupLess" ? "" : data.group,
      tutorID: userID || "",
      userType: "student",
      ...rest,
    };

    if (studentId !== null) {
      dispatch(
        updateStudent(updateStudentData),
        handleModal(
          <AlertModal
            type={"success"}
            message={"Student updated successfully"}
          />
        )
      );
      navigate("/students");
    } else {
      dispatch(
        setStudent(newStudentData),
        handleModal(
          <AlertModal
            type={"success"}
            message={`Your student account has been successfully created. Please find your login details below:
                  Email: ${data.email}
                  Password: ABC1234D`}
            totalTime={100000}
          />
        )
      );
      navigate(
        `/students?newStudentCreated=true&studentsQuantity=${students?.length}`
      );
    }
  };

  const handleAddField = () => {
    const fieldName = `Change here`;
    setExtraFields([...extraFields, fieldName]);
    if (bottomRef.current) {
      bottomRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangeFieldName = (indexToUpdate: number) => {
    //TODO: testar e ver se o valor nao e igual a um ja existente
    if (
      extraField === undefined ||
      extraField === extraFields[indexToUpdate] ||
      extraField === ""
    ) {
      return setExtraField("Change here");
    }

    const updatedFields = [...extraFields];

    extraFields.length > 0 && unregister(extraFields[indexToUpdate]);

    updatedFields[indexToUpdate] =
      extraField === undefined ? "Change here" : extraField;

    setExtraFields(updatedFields);
    setExtraField("");
  };

  const handleDeleteField = (id: number) => {
    unregister(extraFields[id]);
    setExtraFields(extraFields?.filter((_, index) => index !== id));
  };

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Add Students", path: "" },
  ];

  const fromProfileCrumbs = [
    { label: "Students", path: "/students" },
    {
      label: "Student Profile",
      path: `/students/student-profile?studentId=${studentId}`,
    },
    {
      label: "Edit Students",
      path: "",
    },
  ];

  const options: TOption[] = groups
    ? groups?.map((group) => {
        return { label: group.title, value: group.title };
      })
    : [];

  useEffect(() => {
    if (groups === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
    }
  }, [dispatch, groups, userID]);

  useEffect(() => {
    requestStudent({
      uid: userID || "",
      studentId: studentId || "",
    });
  }, [dispatch, reset, userID, studentId]);

  useEffect(() => {
    if (student && student?.info && studentId !== null) {
      const {
        name,
        phone,
        photo,
        email,
        group,
        about,
        birthDate,
        socialNetWork,
        address,
        //not used
        tutorID,
        uid,
        userType,
        average,
        ...rest
      } = student.info;

      const extraKeys = Object.entries(rest).map((extra) => {
        const [key] = extra;
        return key;
      });

      setExtraFields(extraKeys);
      setEditingField(extraKeys.length);

      Object.entries(rest).map((extra) => {
        const [key, value] = extra;
        return setValue(key as keyof TStudent, value as string);
      });

      setValue("name", name);
      setValue("phone", phone);
      setValue("photo", photo);
      setValue("email", email);
      setValue("group", group);
      setValue("birthDate", birthDate);
      setValue("about", about);
      setValue("socialNetWork", socialNetWork);
      setValue("address", address);
    } else {
      reset();
    }
  }, [extraField, reset, setValue, studentId, student]);

  const handleDelete = () => {
    handleModal(
      <DeleteModal
        deleteTitle={watch("name") || ""}
        onDelete={() => {
          dispatch(
            //TODO: remover da lista de usuarios tb
            removeStudent(
              { uid: userID || "", studentId: student?.info?.uid },
              () =>
                handleModal(
                  <AlertModal type={"info"} message={"Student removed"} />
                )
            )
          );
          navigate("/students");
        }}
      />
    );
  };

  // const handleNewUserAlert = (data: TStudent) => {
  //   // onSubmit();
  //   // alert("show");
  //   studentId === null &&
  //     handleModal(
  //       <AlertModal
  //         type={"success"}
  //         message={
  //           <div>
  //             <h3>
  //               Your student account has been successfully created. Please find
  //               the login details below:
  //             </h3>
  //             <br />
  //             <h4>Email: ${watch("email")}</h4>
  //             <h4>Password: ABC1234D</h4>
  //             <br />
  //             <h3>Please forward these details to the student.</h3>
  //             <button>Create </button>
  //           </div>
  //         }
  //         totalTime={50000}
  //       />
  //     );
  // };

  if (isLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={studentId !== null ? fromProfileCrumbs : crumbs} />
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: "Information" }, { label: "Extra Information" }]}
            activeTab={(tab) => setTab(tab)}
            radius={10}
          />
        </Styled.TabContainer>
      )}
      <Styled.ContainerInner>
        {(!isMobile || tab === "Information") && (
          <Card
            title={isMobile ? "" : "New Student"}
            innerCard={isMobile}
            isEmpty={false}
            gridName="newQuiz"
          >
            <Styled.Form
              id="newStudentForm"
              onSubmit={handleSubmit(onSubmit)}
              padding={isMobile}
            >
              <Styled.SelectContainer>
                <SimpleInput
                  label={"Name"}
                  placeholder="Enter the student Name"
                  error={errors.name}
                  {...register("name")}
                />
                <SimpleInput
                  label={"Photo"}
                  placeholder="Enter the student photo"
                  error={errors.photo}
                  {...register("photo")}
                />
              </Styled.SelectContainer>
              <Styled.SelectContainer>
                <SimpleInput
                  label={"Phone"}
                  placeholder="Choose a phone"
                  error={errors.phone}
                  {...register("phone")}
                />
                <SimpleInput
                  label={"Email"}
                  placeholder="Choose a email"
                  error={errors.email}
                  {...register("email")}
                />
              </Styled.SelectContainer>
              <Styled.SelectContainer>
                <SimpleInput
                  label={"Address"}
                  placeholder=""
                  error={errors.address}
                  {...register("address")}
                />
                {groups?.length !== 0 && (
                  <SelectInput
                    label={"Group"}
                    options={[
                      { label: "Select a Group", value: "groupLess" },
                      ...options,
                    ]}
                    error={errors.group}
                    {...register("group")}
                  />
                )}
              </Styled.SelectContainer>
              <Styled.SelectContainer>
                <SimpleInput
                  label={"BirthDate"}
                  placeholder="DD/MM/YYYY"
                  error={errors.birthDate}
                  {...register("birthDate")}
                />
                <SimpleInput
                  label={"Social Net Work"}
                  placeholder="@JonhDoe"
                  error={errors.socialNetWork}
                  {...register("socialNetWork")}
                />
              </Styled.SelectContainer>
              <TextAreaInput
                label="About"
                height="15vh"
                error={errors.about}
                {...register("about")}
              />
            </Styled.Form>
          </Card>
        )}
        {(!isMobile || tab === "Extra Information") && (
          <Card
            isEmpty={false}
            gridName="newQuestion"
            title={isMobile ? "" : "Extra info"}
            innerCard={isMobile}
          >
            {extraFields.length ? (
              <Styled.Form
                id="newStudentForm"
                onSubmit={handleSubmit(onSubmit)}
                padding
              >
                {extraFields.map((fieldName, index) => (
                  <Styled.ExtraInfoContainer>
                    <TextAreaInput
                      label={
                        <Styled.InputLabel
                          value={
                            editingField === index ? extraField : fieldName
                          }
                          onBlur={(e) => {
                            handleChangeFieldName(index);
                            setEditingField(index + 1);
                          }}
                          onChange={(e) => {
                            setExtraField(e.target.value);
                            setEditingField(index);
                          }}
                          placeholder="Enter value name"
                          //TODO: ver um forma de manter tudo editavel
                          disabled={index < extraFields.length - 1}
                        />
                      }
                      width={"100%"}
                      placeholder="Enter question title"
                      {...register(fieldName)}
                    />
                    <Styled.DeleteIcon
                      size={25}
                      onClick={() => handleDeleteField(index)}
                    />
                  </Styled.ExtraInfoContainer>
                ))}
              </Styled.Form>
            ) : (
              <Styled.EmptyForm>
                <h2>Add here extra info about you student</h2>
              </Styled.EmptyForm>
            )}
            <Styled.ButtonCardContainer>
              <Button
                type="button"
                onClick={handleAddField}
                //TODO: fix this: quando adiciona o valor da chave ele some
                // disabled={
                //   !(
                //     extraFields.length === 0 ||
                //     (extraFields[extraFields.length - 1] !== "Change here" &&
                //       watch(extraFields[extraFields.length - 1]))
                //   )
                // }
                disabled
              >
                Add extra information
              </Button>
            </Styled.ButtonCardContainer>
            <div ref={bottomRef}></div>
          </Card>
        )}
        <Styled.ButtonContainer
          justify={studentId !== null ? "space-between" : "flex-end"}
        >
          {studentId !== null && (
            <Button type="button" onClick={handleDelete} variant="danger">
              {isMobile ? "Delete" : "Delete Student"}
            </Button>
          )}
          <Button type="submit" form="newStudentForm">
            {studentId !== null ? "Update " : "Add "}{" "}
            {isMobile ? "" : "Student"}
          </Button>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default StudentCreate;
