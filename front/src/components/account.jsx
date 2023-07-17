import React from "react";
import "./account.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function Account(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("content", theme)}>
        <div className={cssLightHandle("button-container", theme)}>
            <button className={cssLightHandle("button transperent-button", theme)} onClick={props.themeButtonClick}>Change theme</button>
            <hr className={cssLightHandle("", theme)} />
            <button className={cssLightHandle("button filled-button", theme)}>Login</button>
            <button className={cssLightHandle("button transperent-button", theme)}>Register</button>
        </div>
    </div>
}

export default Account;