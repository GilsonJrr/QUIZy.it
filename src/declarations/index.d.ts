// Typescript Declarations
import * as styledModule from "styled-components";
import {
  BackgroundType,
  MainType,
  QuizType,
} from "lib/styled-components/models";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: Record<BackgroundType, string>;
      main: Record<MainType, string>;
      quiz: Record<QuizType, string>;
    };
  }
  export const styled = styledModule;
}
