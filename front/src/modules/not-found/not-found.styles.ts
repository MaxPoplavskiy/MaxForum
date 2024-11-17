import { css } from "@emotion/react";
import { Orbitron, sizes } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const title = (theme: Theme) => css`
    ${Orbitron}
    color: ${theme.colors.secondary};
    font-size: ${sizes.xxxxxl};
`