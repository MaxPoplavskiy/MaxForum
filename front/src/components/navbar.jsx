import React from "react";
import "./navbar.css";

function Navbar(props)
{
    return <div id="navbar">
        
        <div className="navbar-list">
            <div id="navbar-logo">MaxForum</div>
            <div className="navbar-item">Posts</div>
            <div className="navbar-item">Create</div>
        </div>
        <div className="navbar-list">
            
            <div className="navbar-item">My Posts</div>
            <div className="navbar-item">Account</div>
        </div>
    </div>
}

export default Navbar;