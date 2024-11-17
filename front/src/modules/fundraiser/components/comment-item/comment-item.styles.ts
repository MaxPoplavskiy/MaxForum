import { css } from "@emotion/react";
import { Theme } from "../../../../common/types";

export const container = (theme: Theme) => css`
  width: 100%;
  color: ${theme.colors.secondary};
`;
export const topContainer = css`
  display: flex;
  justify-content: space-between;
`;
