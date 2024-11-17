import { css } from "@emotion/react";
import { sizes, spaces } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = css`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: ${spaces[3]};
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const content = css`
  display: flex;
  width: fit-content;
  width: 500px;
  flex-direction: column;
  gap: ${spaces[3]};
`;
export const requestInfo = (theme: Theme) => css`
  color: ${theme.colors.secondary};

  span {
    font-size: ${sizes.m};
  }
`;
export const buttonsContainer = css`
  display: flex;
  justify-content: space-between;

  gap: ${spaces[3]};
  button {
    flex: 1;
  }
`;
