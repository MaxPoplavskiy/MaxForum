import { css } from "@emotion/react";
import { spaces } from "../../common/styles";
import { Theme } from "../../common/types";

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
  gap: ${spaces[3]};
`;

export const accountInfoContainer = (theme: Theme) =>  css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spaces[1]};
  color: ${theme.colors.secondary};

  h5 {
    margin: 3px;
  }
`;
export const spacer = css`
  width: 25%;
  align-self: center;
  margin: ${spaces[1]} 0 ${spaces[5]};
`;
