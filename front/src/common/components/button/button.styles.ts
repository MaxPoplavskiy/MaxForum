import { css } from "@emotion/react";
import { colors, JosefinSans, radius, sizes, spaces, weights } from "../../styles";
import { Theme } from "../../types";

export const button = (theme: Theme) => css`
  ${JosefinSans}
  border-radius: ${radius[2]};
  font-weight: bold;
  font-size: ${sizes.xl};
  border-style: solid;
  text-align: center;
  color: ${theme.colors.primary};
  border-color: ${theme.colors.secondary};
  background-color: ${theme.colors.secondary};
  padding: ${spaces[1]};
  font-weight: ${weights.normal};
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items:center;
  gap: ${spaces[2]};
  height: fit-content;
  justify-content: center
`;

export const transparentButton = (theme: Theme) => css`
  background-color: transparent;
  color: ${theme.colors.secondary};
  border-color: ${theme.colors.secondary};
`;

export const approveButton = (theme: Theme) => css`
  background-color: ${colors.green};
  border-color: ${theme.colors.secondary};
  color: ${colors.black};
  min-width: 120px;
  width: 120px;
`;

export const declineButton = (theme: Theme) => css`
  background-color: ${colors.red};
  border-color: ${theme.colors.secondary};
  color: ${colors.black};
  min-width: 120px;
  width: 120px;
`;
