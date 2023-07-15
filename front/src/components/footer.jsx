import React from "react";
import "./footer.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function Footer(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("footer", theme)}>
        <h3 className={cssLightHandle("footer-text", theme)}>Maxik incorporated©2023</h3>
    </div>
}

export default Footer;