import React from "react";
import "./navbar.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";

function Navbar(props)
{
    const theme = useContext(globalThemeContext);
    
    return <div className={"navbar" + (theme === "light" ? " light" : "")}>
        
        <div className="navbar-list">
            <div className={"navbar-logo" + (theme === "light" ? " light" : "")}>MaxForum</div>
            <div className={"navbar-item" + (theme === "light" ? " light" : "")}>Posts</div>
        </div>
        <div className="navbar-list">
            <div className={"navbar-item" + (theme === "light" ? " light" : "")}>My Posts</div>
            <div className={"navbar-item" + (theme === "light" ? " light" : "")}>Create</div>
            <div className={"navbar-item" + (theme === "light" ? " light" : "")}>Account</div>
        </div>
    </div>
}

export default Navbar;