import { css } from "@emotion/react";
import { Theme } from "../../types";

export const container = (theme: Theme) => css`
  background-color: ${theme.colors.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`