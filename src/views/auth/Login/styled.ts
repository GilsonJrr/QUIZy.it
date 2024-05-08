import styled from "styled-components";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 100px;

  input {
    border: 2px solid #f8f8f8;
    background-color: transparent;
    color: #f8f8f8;
  }
`;

export const Label = styled.label`
  color: #f8f8f8;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  margin-bottom: 40px;
`;

export const Logo = styled.img`
  height: 50px;
`;

export const LogoText = styled.h3`
  color: #f8f8f8;
`;

export const Title = styled.h1`
  color: #f8f8f8;
  margin: 0 0 10px 0;
`;

export const SubTitle = styled.h2`
  color: #f8f8f8;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const Form = styled.form`
  margin: 40px 0 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const LoginButton = styled.button`
  background-color: #f8f8f8;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 10px 30px;
  width: 30%;
  font-size: 1.3rem;
  cursor: pointer;
  margin-top: 8px;
`;
