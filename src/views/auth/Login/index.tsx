import React, { FC } from "react";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import Logo from "assets/images/White_Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { requestSignInEmailPassword } from "Store/auth/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import LoadingSpinner from "components/LoadingSpiner";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import { Title } from "components/ui/Typography/styled";
import PasswordInput from "components/inputs/PasswordInput";

type LoginProps = {};

type TLogin = {
  login: string;
  password: string;
};

const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: TLogin) => {
    dispatch(
      requestSignInEmailPassword({
        email: data.login,
        password: data.password,
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
        LOGIN
      </Title>
      <Title color="light" size="small" fontWeight="normal">
        Start your guide to knowledge
      </Title>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <SimpleInput
          label={<Styled.Label>User Name</Styled.Label>}
          placeholder="Type your email"
          error={errors.login}
          {...register("login")}
        />
        <PasswordInput
          label={
            <Styled.PasswordLabelContainer>
              <Styled.Label>Password</Styled.Label>
              <Styled.ForgotPasswordText
                onClick={() => navigate("/request-reset")}
              >
                Forgot password?
              </Styled.ForgotPasswordText>
            </Styled.PasswordLabelContainer>
          }
          placeholder="Type your password"
          error={errors.password}
          {...register("password")}
        />
        <Styled.ButtonContainer>
          <Button variant="secondary" radius="30px">
            {isLoading ? <LoadingSpinner /> : "Login Now"}
          </Button>
          <Button
            variant="anchor-white"
            onClick={() => navigate("/signUp")}
            padding="0"
            size="small"
          >
            Don't have a account?,
            <Styled.ForgotPasswordText>SignUp</Styled.ForgotPasswordText>
          </Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Login;
