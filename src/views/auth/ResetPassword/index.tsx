import React from "react";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import Logo from "assets/images/White_Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { requestSignInEmailPassword } from "Store/auth/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import LoadingSpinner from "components/LoadingSpiner";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button";
import { useModalContext } from "components/Modal/modalContext";
import AlertModal from "components/Modal/AlertModal";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "lib/firebase";

type TResetPassword = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const { handleModal } = useModalContext();

  const oobCode = new URLSearchParams(location.search).get("oobCode");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassword>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: TResetPassword) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      handleModal(<AlertModal type="error" message="Passwords do not match" />);
      return;
    }

    //TODO: add this on Saga
    confirmPasswordReset(auth, oobCode || "", data.password);
  };

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo src={Logo} alt="Logo image" />
        <Styled.LogoText>QUIZy.it</Styled.LogoText>
      </Styled.LogoContainer>
      <Styled.Title>RESET PASSWORD</Styled.Title>
      {/* <Styled.SubTitle>Start your guide to knowledge</Styled.SubTitle> */}
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <SimpleInput
          label={<Styled.Label>Password</Styled.Label>}
          placeholder="Type your email"
          type="password"
          error={errors.password}
          {...register("password")}
        />
        <SimpleInput
          label={<Styled.Label>Confirm Password</Styled.Label>}
          placeholder="Type your password"
          type="password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
        <Styled.ButtonContainer>
          <Button variant="secondary" radius="30px">
            {isLoading ? <LoadingSpinner /> : "Reset Password"}
          </Button>
          {/* <Button variant="anchor-white" onClick={() => navigate("/login")}>
            login
          </Button> */}
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.Container>
  );
};

export default ResetPassword;
