import React from "react";
import "./navbar.css";

function Navbar(props)
{
    return <div id="navbar">
        <ul id="navbar-list">
            <div id="navbar-logo" className="navbar-item">MaxForum</div>
            <div className="navbar-item">Posts</div>
            <div className="navbar-item">Create</div>
        </ul>
    </div>
}

export default Navbar;