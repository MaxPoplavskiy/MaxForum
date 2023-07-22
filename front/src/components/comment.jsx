import React from "react";
import "./comment.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function Comment(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("comment-container", theme)}>
        <div className="comment-upperbody">
            <h1 className={cssLightHandle("comment-title", theme)}>{props.author}</h1>
            <p className={cssLightHandle("comment-timestamp", theme)}>{props.timestamp}</p>
        </div>
        <p className={cssLightHandle("comment-content", theme)}>{props.content}</p>
    </div>
}

export default Comment;