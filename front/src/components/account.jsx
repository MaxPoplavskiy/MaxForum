import React from "react";
import "./account.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";


function Account(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={"content" + (theme === "light" ? " light" : "")}>
        <div className={"button-container" + (theme === "light" ? " light" : "")}>
            <button className="transperent-button button" onClick={props.themeButtonClick}>Change theme</button>
            <hr className={(theme === "light" ? " light" : "")} />
            <button className="button login-button">Login</button>
            <button className="button transperent-button">Register</button>
        </div>
    </div>
}

export default Account;