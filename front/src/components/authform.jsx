import React, { useState } from "react";
import "./authform.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function AuthForm(props)
{
    const theme = useContext(globalThemeContext);

    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    function checkPasswordsEquality(pas1, pas2)
    {
        if(pas1 === "" || pas2 === "")
        {
            return "";
        }
        if(pas1 !== pas2)
        {
            return "red";
        }
        else
        {
            return "green";
        }
    }

    function firstPasswordChange(event)
    {
        setFirstPassword(event.target.value);
    }

    function secondPasswordChange(event)
    {
        setSecondPassword(event.target.value);
    }

    return <div className={cssLightHandle("content", theme)}>
        <div className={cssLightHandle("auth-container", theme)}>
            <div><h1 id="auth-title" className={cssLightHandle("title", theme)}>{props.title}</h1></div>
            <div className={cssLightHandle("auth-inputs-container", theme)}>
                <input type="email" className={cssLightHandle("authform-input", theme)} placeholder="Email" />
                <input type="password" style={{borderColor: checkPasswordsEquality(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Password" onChange={firstPasswordChange} />
                {props.title === "Register" ? <input type="password" style={{borderColor: checkPasswordsEquality(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Repeat password" onChange={secondPasswordChange} /> : ""}
            </div>
            <button id="authform-submit-btn" className={cssLightHandle("button transperent-button", theme)}>Submit</button>
        </div>
    </div>
}

export default AuthForm;