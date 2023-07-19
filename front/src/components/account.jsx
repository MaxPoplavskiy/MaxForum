import React from "react";
import "./account.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Account(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("center-content", theme)}>
        <div className={cssLightHandle("button-container", theme)}>
            <button className={cssLightHandle("button transperent-button", theme)} onClick={props.themeButtonClick}>Change theme</button>
            <hr className={cssLightHandle("", theme)} />
            <Link to="/login" className={cssLightHandle("button filled-button", theme)}>Login</Link>
            <Link to="/register" className={cssLightHandle("button transperent-button", theme)}>Register</Link>
        </div>
    </div>
}

export default Account;