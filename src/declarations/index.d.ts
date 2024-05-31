// Typescript Declarations
import * as styledModule from "styled-components";
import {
  BackgroundType,
  MainType,
  QuizType,
  AlertType,
  TextType,
  ButtonType,
} from "lib/styled-components/models";
import translationEN from "locales/pt.json";
import translationPT from "locales/pt.json";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: Record<BackgroundType, string>;
      main: Record<MainType, string>;
      quiz: Record<QuizType, string>;
      alert: Record<AlertType, string>;
      text: Record<TextType, string>;
      button: Record<ButtonType, string>;
    };
  }
  export const styled = styledModule;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof translationEN;
      pt: typeof translationPT;
    };
  }
}
