import { css } from "@emotion/react";
import { Orbitron, sizes } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;
export const title = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
  font-size: ${sizes.xxxl};
  margin-top: 1rem;
  margin-bottom: 10px;
`;
export const fundraisersContainer = css`
  width: 60%;
  display: grid;
  gap: 15px;
  grid-template-columns: 50% 50%;
`;
