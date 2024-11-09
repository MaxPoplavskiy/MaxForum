import { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { radius } from "../../styles";

export const spacer = (theme: Theme) => css`
  width: 100%;
  border: none;
  border-bottom: 1px ${theme.colors.secondary} solid;
  margin: 0;
`
export const spacerThick = css`
  border-width: 3px;
`
export const verticalSpacer = (theme: Theme) => css`
  border: none;
  border-left: 1px ${theme.colors.secondary} solid;
  margin: 0;
  height: 100%;
  width: 1px;
`
export const rounded = css`
  border-radius: ${radius[3]};
`