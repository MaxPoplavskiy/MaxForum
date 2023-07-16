import React from "react";
import "./create-post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function CreatePost(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("create-menu", theme)}>
        <h1 className={cssLightHandle("title", theme)}>Create<hr className={cssLightHandle("", theme)} /></h1>
    </div>
}

export default CreatePost;