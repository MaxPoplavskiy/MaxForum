import { css } from "@emotion/react";
import { Theme } from "../../types/theme.type";
import { JosefinSans } from "../../styles";

export const container = (theme: Theme) => css`
    background-color: ${theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    border-top: 2px ${theme.colors.secondary} solid;
    margin-top: auto;
`
export const text = (theme: Theme) => css`
    ${JosefinSans}
    color: ${theme.colors.secondary};
`