import { css } from "@emotion/react";
import { Orbitron, sizes, spaces } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
export const title = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
  font-size: ${sizes.xxxl};
  margin-top: 1rem;
  margin-bottom: 10px;
`;
export const formContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${spaces[5]};
  align-items: center;
`;
export const form = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spaces[5]};
  min-height: 450px;
  min-width: 900px;
`;
export const column = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export const middleInputContainer = css`
  display: flex;
  gap: ${spaces[5]};
`
