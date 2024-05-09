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
import { idGenerator } from "utils/index";
import { useDispatch } from "react-redux";
import { setStudent } from "Store/students/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import { useNavigate } from "react-router-dom";

type StudentCreateProps = {};

type TStudent = {
  name: string;
  phone?: string;
  photo?: string;
  email: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  address?: string;
};

const StudentCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { groups } = useSelector((state: RootState) => state.groupReducer);
  const userID = localStorage.getItem("userId") || "";

  const [extraFields, setExtraFields] = useState<any[]>([]);
  const [extraField, setExtraField] = useState<string>();
  const [editingField, setEditingField] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
  } = useForm<TStudent>({
    resolver: yupResolver(StudentCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    const { group, ...rest } = data;

    const preparedData = {
      id: idGenerator(18),
      uid: userID,
      group: data.group === "groupLess" ? "" : data.group,
      ...rest,
    };

    // console.log("data", preparedData);
    dispatch(setStudent(preparedData));
    navigate(-1);
  };

  const handleAddField = () => {
    const fieldName = `Change here`;
    setExtraFields([...extraFields, fieldName]);
    if (bottomRef.current) {
      bottomRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangeFieldName = (indexToUpdate: number) => {
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
    setExtraFields(extraFields.filter((_, index) => index !== id));
  };

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Add Students", path: "/students/student-create" },
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

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.ContainerInner>
        <Card title={"New Student"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
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
        <Card title={`Extra info`} isEmpty={false} gridName="newQuestion">
          {extraFields.length ? (
            <Styled.Form
              id="newStudentForm"
              onSubmit={handleSubmit(onSubmit)}
              padding
            >
              {extraFields.map((fieldName, index) => (
                <Styled.ExtraInfoContainer>
                  <SimpleInput
                    label={
                      <Styled.InputLabel
                        value={editingField === index ? extraField : fieldName}
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
            <Styled.SubmitButton
              type="button"
              onClick={handleAddField}
              disabled={
                !(
                  extraFields.length === 0 ||
                  (extraFields[extraFields.length - 1] !== "Change here" &&
                    watch(extraFields[extraFields.length - 1]))
                )
              }
            >
              Add
            </Styled.SubmitButton>
          </Styled.ButtonCardContainer>
          <div ref={bottomRef}></div>
        </Card>
        <Styled.ButtonContainer>
          <Styled.SubmitButton type="submit" form="newStudentForm">
            Add Student
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default StudentCreate;
