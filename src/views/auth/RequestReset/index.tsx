import React from "react";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import Logo from "assets/images/White_Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestResetSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { requestPasswordReset } from "Store/auth/actions";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import LoadingSpinner from "components/LoadingSpiner";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import AlertModal from "components/Modal/AlertModal";
import { useModalContext } from "components/Modal/modalContext";
import { validateEmail } from "utils/index";
import { Title } from "components/ui/Typography/styled";

type TRequestReset = {
  login: string;
};

const RequestReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.auth);
  const { handleModal } = useModalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRequestReset>({
    resolver: yupResolver(RequestResetSchema),
  });

  const onSubmit = (data: TRequestReset) => {
    if (validateEmail(data.login)) {
      dispatch(requestPasswordReset({ email: data.login }));
      handleModal(
        <AlertModal type="success" message="Reset email send successfully" />
      );
      navigate("/login");
      return;
    }
    handleModal(<AlertModal type="error" message="Email is not valid" />);
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
        RESET PASSWORD
      </Title>

      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <SimpleInput
          label={<Styled.Label>Email</Styled.Label>}
          placeholder="Type your email"
          error={errors.login}
          {...register("login")}
        />
        <Styled.ButtonContainer>
          <Button variant="secondary" radius="30px">
            {isLoading ? <LoadingSpinner /> : "Send"}
          </Button>
          <Button
            variant="anchor-white"
            onClick={() => navigate("/login")}
            padding="0"
            size="small"
          >
            Back to Login
          </Button>
        </Styled.ButtonContainer>
      </Styled.Form>
    </Styled.Container>
  );
};

export default RequestReset;
