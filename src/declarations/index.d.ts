// Typescript Declarations
import * as styledModule from "styled-components";
import {
  BackgroundType,
  MainType,
  QuizType,
  AlertType,
} from "lib/styled-components/models";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: Record<BackgroundType, string>;
      main: Record<MainType, string>;
      quiz: Record<QuizType, string>;
      alert: Record<AlertType, string>;
    };
  }
  export const styled = styledModule;
}
