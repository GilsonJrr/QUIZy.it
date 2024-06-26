import React, { FC } from "react";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import Logo from "assets/images/White_Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { requestSignUpEmailPassword } from "Store/auth/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import LoadingSpinner from "components/LoadingSpiner";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import { Title } from "components/ui/Typography/styled";
import PasswordInput from "components/inputs/PasswordInput";

type SignUpProps = {};

type TSignUp = {
  login: string;
  password: string;
  name: string;
};

const SignUp: FC<SignUpProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: TSignUp) => {
    dispatch(
      requestSignUpEmailPassword({
        email: data.login,
        password: data.password,
        userType: "tutor",
        name: data.name,
      })
    );
  };

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo src={Logo} alt="Logo image" />
        <Title color="light" size="small">
          QUIZy.it
        </Title>
      </Styled.LogoContainer>
      <Title color="light" size="bigger" margin="0 0 10px 0">
        SIGN UP
      </Title>
      <Title color="light" size="small" fontWeight="normal">
        Join the quiz fun now! Sign up!
      </Title>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <SimpleInput
          label={<Styled.Label>User Name</Styled.Label>}
          placeholder="Type your email"
          error={errors.login}
          {...register("login")}
        />
        <SimpleInput
          label={<Styled.Label>Name</Styled.Label>}
          placeholder="Type your name"
          error={errors.name}
          {...register("name")}
        />
        <PasswordInput
          label={<Styled.Label>Password</Styled.Label>}
          placeholder="Type your password"
          error={errors.password}
          {...register("password")}
        />
        <Styled.ButtonContainer>
          <Button variant="secondary" radius="30px">
            {isLoading ? <LoadingSpinner /> : "SignUp Now"}
          </Button>
          <Button
            variant="anchor-white"
            onClick={() => navigate("/login")}
            padding="0"
            size="small"
          >
            Already have a account?,
            <Styled.ForgotPasswordText>Login</Styled.ForgotPasswordText>
          </Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.Container>
  );
};

export default SignUp;
