import React from "react";
import "./account.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";


function Account(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={"content" + (theme === "light" ? " light" : "")}>
        
    </div>
}

export default Account;