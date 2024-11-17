import React, { useMemo } from "react";
import { container, text } from "./footer.styles";
import { useTheme } from "@emotion/react";


export const Footer: React.FC = () => {
    const theme = useTheme()

    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return <div css={container(theme)}>
        <h3 css={text(theme)}>Maxik incorporated©{currentYear}</h3>
    </div>
}

export default Footer;