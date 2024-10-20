import { css, Theme } from "@emotion/react";
import { JosefinSans, radius, sizes } from "../../styles";

export const container = css`
  flex-grow: 1;
  display: flex;
`;
export const uploadContainer = (theme: Theme) => css`
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${radius[2]};

  display: flex;
  flex-grow: 1;
  & > label {
    ${JosefinSans}
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    font-size: ${sizes.xl};
  }
`;
export const fileUpload = css`
  display: none;
`;
export const previewContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const image = css`
  object-fit: cover;
  max-height: 400px;
  border-radius: ${radius[2]};
`;
