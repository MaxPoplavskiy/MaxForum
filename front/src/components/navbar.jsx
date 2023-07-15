import React from "react";
import "./navbar.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar(props)
{
    const theme = useContext(globalThemeContext);
    
    return <div className={"navbar" + (theme === "light" ? " light" : "")}>
        
        <div className="navbar-list">
        <Link to="/" className={"navbar-logo" + (theme === "light" ? " light" : "")}>MaxForum</Link>
        <Link to="/posts" className={"navbar-item" + (theme === "light" ? " light" : "")}>Posts</Link>
        </div>
        <div className="navbar-list">
            <Link to="/my-posts" className={"navbar-item" + (theme === "light" ? " light" : "")}>My Posts</Link>
            <Link to="/create" className={"navbar-item" + (theme === "light" ? " light" : "")}>Create</Link>
            <Link to="account" className={"navbar-item" + (theme === "light" ? " light" : "")}>Account</Link>
        </div>
    </div>
}

export default Navbar;