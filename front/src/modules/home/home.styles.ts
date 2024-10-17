import { css } from "@emotion/react"
import { JosefinSans, sizes, spaces, weights } from "../../common/styles"
import { Theme } from "../../common/types"

export const container = css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    gap: ${spaces[3]};
    align-items: center;
    flex-direction: column;
`

export const title = css`
    font-size: ${sizes.xxxxl};
    margin-bottom: 0;
`
export const spacer = css`
    width: 25%;
`
export const text = (theme: Theme) => css`
    ${JosefinSans}
    color: ${theme.colors.secondary};
    font-weight: ${weights.extraLight};
    font-size: ${sizes.xl};
    width: 40%;
    text-align: center;
    line-height: 24px;
`