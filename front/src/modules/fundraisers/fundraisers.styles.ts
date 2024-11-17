import { css } from "@emotion/react";
import { Orbitron, sizes, spaces, weights } from "../../common/styles";
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
  margin-bottom: ${spaces[2]};
`;
export const filterContainer = css`
  display: flex;
  width: 60%;
  margin: ${spaces[2]} 0;
  justify-content: end;
  gap: ${spaces[1]};
`
export const nameFilterInput = css`
  ${Orbitron}
  font-size: ${sizes.l};
  font-weight: ${weights.bold};
  width: 150px;
  border-width: 3px;
`
export const fundraisersContainer = css`
  width: 60%;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
`;
