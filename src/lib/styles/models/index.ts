import { theme } from "../globalStyles";

export type Theme = typeof theme;

export type WithStyledTheme = {
  theme: Theme;
};

// COLOR TYPES
export type BackgroundType = "default" | "secondary" | "highlight";

export type MainType = "default";

export type QuizType = "right" | "wrong";

export type AlertType = "Error" | "Success" | "Warning" | "Info";

export type TextType = "Error" | "Success" | "Warning" | "default" | "light";
