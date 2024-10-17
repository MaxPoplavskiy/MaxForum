import { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const spacer = (theme: Theme) => css`
  width: 100%;
  border-bottom: 1px ${theme.colors.secondary} solid;
  margin: 0;
`