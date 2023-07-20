import React, { useState } from "react";
import "./authform.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import axios from "axios";
import { enqueueSnackbar } from 'notistack'
import { redirect, useNavigate } from "react-router-dom";

function AuthForm(props)
{
    const theme = useContext(globalThemeContext);

    const [email, setEmail] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const navigate = useNavigate();
    

    function submitButton(event)
    {
        debugger
        console.log(window.location.href);
        axios.post(window.location.href, {username: email, password: firstPassword})
        .then((response) => {
            if(response.data === "success")
            {
                navigate("/account");
            }
            else
            {
                enqueueSnackbar(response.data, { variant: "error", autoHideDuration: 1000 });
            }
        });
    }

    function emailChange(event)
    {
        setEmail(event.target.value);
    }

    function firstPasswordChange(event)
    {
        setFirstPassword(event.target.value);
    }

    function secondPasswordChange(event)
    {
        setSecondPassword(event.target.value);
    }

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

    return <div className={cssLightHandle("center-content", theme)}>
        <div method="post" action={window.location.href} className={cssLightHandle("auth-container", theme)}>
            <div><h1 id="auth-title" className={cssLightHandle("title", theme)}>{props.title}</h1></div>
            <div className={cssLightHandle("auth-inputs-container", theme)}>
                <input type="email" name="username" className={cssLightHandle("authform-input", theme)} placeholder="Email" onChange={emailChange} />
                <input type="password" name="password" style={{borderColor: checkPasswordsEquality(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Password" onChange={firstPasswordChange} />
                {props.title === "Register" ? <input type="password" style={{borderColor: checkPasswordsEquality(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Repeat password" onChange={secondPasswordChange} /> : ""}
            </div>
            <button onClick={submitButton} id="authform-submit-btn" className={cssLightHandle("button transperent-button", theme)}>Submit</button>
        </div>
    </div>
}

export default AuthForm;