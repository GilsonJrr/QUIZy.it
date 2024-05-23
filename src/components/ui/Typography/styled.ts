import styled, { css } from "styled-components";

type TypographyProps = {
  size?: "smaller" | "small" | "medium" | "big" | "bigger";
  color?: "light" | "default" | "error" | "success" | "warning";
  fontWeight?: "lighter" | "normal" | "bold" | "bolder";
  margin?: string;
  padding?: string;
  textAlign?: "left" | "center" | "right";
  width?: string;
  multiLine?: boolean;

  answerType?: "default" | "wrong" | "right";
};

enum ETypeSize {
  "smaller" = "0.95rem",
  "small" = "1.2rem",
  "medium" = "1.4rem",
  "big" = "1.8rem",
  "bigger" = "2rem",
}

export const Ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export const Title = styled.h2<TypographyProps>`
  font-size: ${({ size }) => ETypeSize[size || "medium"]};
  font-weight: ${({ fontWeight }) => fontWeight || "bold"};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ theme, color }) => theme.colors.text[color || "default"]};
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};

  ${({ multiLine }) => (multiLine ? "" : Ellipsis)};
`;

export const Paragraph = styled.p<TypographyProps>`
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-size: ${({ size }) => ETypeSize[size || "medium"]};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  color: ${({ theme, color }) => theme.colors.text[color || "default"]};
`;

export const AnswerText = styled.h4<TypographyProps>`
  color: ${({ theme, answerType }) =>
    answerType && theme.colors.quiz[answerType]};
  text-decoration: ${({ answerType }) =>
    answerType !== "default" ? "underline" : ""};
  white-space: pre;
`;
