import React from "react";
import "./authform.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function AuthForm(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("content", theme)}>
        <div className={cssLightHandle("auth-container", theme)}>
            <div><h1 id="auth-title" className={cssLightHandle("title", theme)}>{props.title}</h1></div>
            <div className={cssLightHandle("auth-inputs-container", theme)}>
                <input type="email" className={cssLightHandle("authform-input", theme)} placeholder="Email" />
                <input type="password" className={cssLightHandle("authform-input", theme)} placeholder="Password" />
                {props.title === "Register" ? <input type="password" className={cssLightHandle("authform-input", theme)} placeholder="Repeat password" /> : ""}
            </div>
            <button id="authform-submit-btn" className={cssLightHandle("button transperent-button", theme)}>Submit</button>
        </div>
    </div>
}

export default AuthForm;