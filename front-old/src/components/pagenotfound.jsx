import React from "react";
import "./pagenotfound.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";


function PageNotFound(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={"center-content" + (theme === "light" ? " light" : "")}>
        <h1 className={"code" + (theme === "light" ? " light" : "")}>404</h1>
    </div>
}

export default PageNotFound;