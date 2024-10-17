/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Theme as ThemeType } from "../common/types";

// src/emotion.d.ts
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
