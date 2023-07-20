import React from "react";
import "./account.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { authStatusContext } from "../authStatusContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../authStatusContext";

function Account(props)
{
    const theme = useContext(globalThemeContext);
    const authStatus = useContext(authStatusContext);

    return <div className={cssLightHandle("center-content", theme)}>
        <div className={cssLightHandle("button-container", theme)}>
            <button className={cssLightHandle("button transperent-button", theme)} onClick={props.themeButtonClick}>Change theme</button>
            <hr className={cssLightHandle("", theme)} />
            {authStatus ?
            <button onClick={logOut} className={cssLightHandle("button filled-button", theme)}>Logout</button>
            :
            <Link to="/login" className={cssLightHandle("button filled-button", theme)}>Login</Link>
            }
            {!authStatus && <Link to="/register" className={cssLightHandle("button transperent-button", theme)}>Register</Link>}
        </div>
    </div>
}

export default Account;