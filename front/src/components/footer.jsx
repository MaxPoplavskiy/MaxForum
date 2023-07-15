import React from "react";
import "./footer.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";


function Footer(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={"footer" + (theme === "light" ? " light" : "")}>
        <h3 className={"footer-text" + (theme === "light" ? " light" : "")}>Maxik incorporated©2023</h3>
    </div>
}

export default Footer;