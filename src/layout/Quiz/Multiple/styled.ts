import styled from "styled-components";

type Props = {
  progress?: number;
  active?: boolean;
  buttonType?: "primary" | "secondary";
  modalType?: string;
  checkType?: string;
  preview?: boolean;
};

export const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    align-items: flex-start;
    justify-content: center;
    gap: 50px;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;

  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;

export const Question = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.main.default};
  margin-bottom: 30px;
  @media screen and (min-width: 600px) {
    width: 50%;
    text-align: top;
    font-size: 2rem;
    margin: 0 10px;
    margin-bottom: 0px;
    position: sticky;
    top: 0;
  }
`;

export const ProgressNumber = styled.h3``;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  text-align: left;

  button {
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const AnswerIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.main.default};
  color: ${({ theme }) => theme.colors.background.default};
  height: 30px;
  width: 30px;
  border-radius: 100%;
  line-height: 0;
  font-weight: 700;
`;

export const AnswerText = styled.h3<Props>`
  color: ${({ theme }) => theme.colors.main.default};
  width: 90%;
  text-align: left;
`;
