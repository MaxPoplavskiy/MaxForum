import { css } from "@emotion/react";
import { JosefinSans, Orbitron, sizes, spaces, weights } from "../../styles";
import { Theme } from "../../types";

export const container = (theme: Theme) => css`
    background-color: ${theme.colors.primary};
    display: flex;
    justify-content: space-between;
    padding: ${spaces[4]} 0;
    border-bottom: 2px ${theme.colors.secondary} solid;
` 
export const logo = (theme: Theme) => css`
    ${Orbitron}
    font-size: ${sizes.xxxl};
    margin-left: 2rem;
    color: ${theme.colors.secondary};
`
export const item = (theme: Theme) => css`
    ${JosefinSans}
    color: ${theme.colors.secondary};
    font-size: ${sizes.xl};
    font-weight: ${weights.light};
`
export const list = css`
    list-style: none;
    gap: 50px;
    margin-right: ${spaces[3]};
    display: flex;
    align-items:end;

    & * {
        margin-bottom: 0;
        line-height: 85%;
    }
`
