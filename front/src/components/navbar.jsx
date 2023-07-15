import React from "react";
import "./navbar.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar(props)
{
    const theme = useContext(globalThemeContext);
    
    function activeStyle(status)
    {
        return {fontWeight: status.isActive ? "bold" : "",}
    }

    return <div className={"navbar" + (theme === "light" ? " light" : "")}>
        
        <div className="navbar-list">
        <NavLink to="/" className={"navbar-logo" + (theme === "light" ? " light" : "")}>MaxForum</NavLink>
        <NavLink to="/posts" style={activeStyle} className={"navbar-item" + (theme === "light" ? " light" : "")}>Posts</NavLink>
        </div>
        <div className="navbar-list">
            <NavLink to="/my-posts" style={activeStyle} className={"navbar-item" + (theme === "light" ? " light" : "")}>My Posts</NavLink>
            <NavLink to="/create" style={activeStyle} className={"navbar-item" + (theme === "light" ? " light" : "")}>Create</NavLink>
            <NavLink to="account" style={activeStyle} className={"navbar-item" + (theme === "light" ? " light" : "")}>Account</NavLink>
        </div>
    </div>
}

export default Navbar;