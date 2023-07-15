import React from "react";
import "./navbar.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar(props)
{
    const theme = useContext(globalThemeContext);
    
    function activeStyle(status)
    {
        return {fontWeight: status.isActive ? "bold" : "",}
    }

    return <div className={cssLightHandle("navbar", theme)}>
        
        <div className="navbar-list">
        <NavLink to="/" className={cssLightHandle("navbar-logo", theme)}>MaxForum</NavLink>
        <NavLink to="/posts" style={activeStyle} className={cssLightHandle("navbar-item", theme)}>Posts</NavLink>
        </div>
        <div className="navbar-list">
            <NavLink to="/my-posts" style={activeStyle} className={cssLightHandle("navbar-item", theme)}>My Posts</NavLink>
            <NavLink to="/create" style={activeStyle} className={cssLightHandle("navbar-item", theme)}>Create</NavLink>
            <NavLink to="account" style={activeStyle} className={cssLightHandle("navbar-item", theme)}>Account</NavLink>
        </div>
    </div>
}

export default Navbar;