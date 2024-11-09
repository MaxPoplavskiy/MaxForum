import { css } from "@emotion/react";
import { JosefinSans, Orbitron, weights } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = css`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
`;
export const fundraiserGrid = css`
  display: grid;
  width: 70%;
  grid-template-columns: 20% 5% 75%;
  gap: 20px;
`;
export const imageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const image = (theme: Theme) => css`
  width: 100%;
  border-radius: 10px;
  border: 3px ${theme.colors.secondary} solid;
  box-sizing: border-box;
`;
export const title = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
`;
export const text = (theme: Theme) => css`
  color: ${theme.colors.secondary};
`;
export const description = (theme: Theme) => css`
  ${JosefinSans}
  font-size: 1.4rem;
  font-weight: ${weights.light};
  color: ${theme.colors.secondary};
`;
export const bottomContainer = css`
  display: flex;
  grid-column: span 3;
  justify-content: space-between;
`;
export const infoText = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
  font-size: 1rem;
  margin: 0;
`;
export const bottomSpacer = css`
  grid-column: span 3;
`;
