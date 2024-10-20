import { css } from "@emotion/react";
import { JosefinSans, radius, sizes, spaces, weights } from "../../styles";
import { Theme } from "../../types";

export const textarea = (theme: Theme) => css`
  ${JosefinSans}
  font-weight: ${weights.semiBold};
  font-size: ${sizes.m};
  resize: none;
  border-radius: ${radius[1]};
  border: 2px ${theme.colors.secondary} solid;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  box-sizing: border-box;
  width: 100%;
  padding: ${spaces[1]};
  flex-grow: 1;
  margin: 0;
`;
