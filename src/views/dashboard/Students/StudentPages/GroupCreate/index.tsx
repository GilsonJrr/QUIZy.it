import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { GroupCreateSchema } from "lib/schemas";
type StudentCreateProps = {};

type TStudent = {
  groupTitle: string;
  about?: string;
};

const GroupCreate: FC<StudentCreateProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TStudent>({
    resolver: yupResolver(GroupCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    console.log("data", data);
  };

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Add Group", path: "/students/group-create" },
  ];

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.ContainerInner>
        <Card title={"New Group"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput
              label={"Group Title"}
              placeholder="Enter the group title"
              error={errors.groupTitle}
              {...register("groupTitle")}
            />
            <TextAreaInput
              label="About"
              height="53vh"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        </Card>
        <Card title={"All Groups"} isEmpty={false} gridName="newQuestion">
          <>"All groups here"</>
        </Card>
        <Styled.ButtonContainer>
          <Styled.SubmitButton type="submit" form="newStudentForm">
            Add Group
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default GroupCreate;
