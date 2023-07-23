import React, { useState } from "react";
import "./authform.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { authStatusContext } from "../authStatusContext";
import { useContext } from "react";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';
import {  useNavigate } from "react-router-dom";

function AuthForm(props)
{
    const theme = useContext(globalThemeContext);

    const [email, setEmail] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const navigate = useNavigate();
    const [authStatus, checkAuthStatus] = useContext(authStatusContext);

    function submitButton(event)
    {
        if(props.title === "Register" && !checkPasswordsEquality(firstPassword, secondPassword))
        {
            enqueueSnackbar("passwords should be equal", { variant: "error", autoHideDuration: 1000 });
        }
        else
        {
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
                checkAuthStatus();
            })
            .catch((err) =>
            {
                enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
            });
        }
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

    function checkPasswordsEquality(password1, password2)
    {
        return password1 === password2;
    }

    function passwordInputColor(pas1, pas2)
    {
        if(pas1 === "" || pas2 === "")
        {
            return "";
        }
        if(checkPasswordsEquality(pas1, pas2))
        {
            return "green";
        }
        else
        {
            return "red";
        }
    }

    return <div className={cssLightHandle("center-content", theme)}>
        <div method="post" action={window.location.href} className={cssLightHandle("auth-container", theme)}>
            <div><h1 id="auth-title" className={cssLightHandle("title", theme)}>{props.title}</h1></div>
            <div className={cssLightHandle("auth-inputs-container", theme)}>
                <input type="email" name="username" className={cssLightHandle("authform-input", theme)} placeholder="Email" onChange={emailChange} />
                <input type="password" name="password" style={{borderColor: passwordInputColor(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Password" onChange={firstPasswordChange} />
                {props.title === "Register" ? <input type="password" style={{borderColor: passwordInputColor(firstPassword, secondPassword)}} className={cssLightHandle("authform-input", theme)} placeholder="Repeat password" onChange={secondPasswordChange} /> : ""}
            </div>
            <button onClick={submitButton} id="authform-submit-btn" className={cssLightHandle("button transperent-button", theme)}>Submit</button>
        </div>
    </div>
}

export default AuthForm;