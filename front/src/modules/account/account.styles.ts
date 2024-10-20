import { css } from "@emotion/react";
import { spaces } from "../../common/styles";

export const container = css`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: ${spaces[3]};
  align-items: center;
  flex-direction: column;
`;
export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 15%;
`;
export const spacer = css`
  width: 25%;
  align-self: center;
  margin: ${spaces[3]} 0 ${spaces[10]};
`;
