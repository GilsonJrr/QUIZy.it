import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  input {
    border: 2px solid ${({ theme }) => theme.colors.background.default};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.background.default};
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.background.default};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  margin-bottom: 40px;
  flex-direction: column;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Logo = styled.img`
  height: 50px;
`;

export const Form = styled.form`
  margin: 40px 0 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const AnchorButton = styled.a`
  color: ${({ theme }) => theme.colors.background.default};
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

export const PasswordLabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ForgotPasswordText = styled.label`
  color: #6690e3;
  cursor: pointer;
`;
