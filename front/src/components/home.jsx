import React from "react";
import "./home.css";
import { globalThemeContext } from "../globalThemeContext";
import { useContext } from "react";


function Home(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={"content" + (theme === "light" ? " light" : "")}>
        <h1 className={"title" + (theme === "light" ? " light" : "")}>MAXFORUM<hr className={(theme === "light" ? " light" : "")} /></h1>
        <p className={"about" + (theme === "light" ? " light" : "")}>MaxForum is a popular online discussion platform that has gained significant traction among internet users in recent years. With its user-friendly interface and robust features, MaxForum has become a go-to destination for individuals and communities looking to engage in meaningful conversations, share knowledge, and connect with like-minded individuals.</p>
    </div>
}

export default Home;