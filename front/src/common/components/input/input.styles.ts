import { css } from "@emotion/react";
import { JosefinSans, radius, sizes, spaces, weights } from "../../styles";
import { Theme } from "../../types";

export const input = (theme: Theme) => css`
  ${JosefinSans}
  box-sizing: border-box;
  font-weight: ${weights.semiBold};
  font-size: ${sizes.xl};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: 2px ${theme.colors.secondary} solid;
  border-radius: ${radius[1]};
  width: 100%;
  padding: ${spaces[1]};
`