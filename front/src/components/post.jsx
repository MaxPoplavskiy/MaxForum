import React, { useState } from "react";
import "./post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useEffect } from "react";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post(props)
{
    const { postId } = useParams();
    const theme = useContext(globalThemeContext);
    const [post, setPost] = useState({});

    useEffect(() => {
        console.log(window.location.href);
        axios.get(window.location.href)
        .then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
    }, [postId]);

    return <div className="post-container">
        <div className="post-grid">
                <div className="post-img-container">
                    <img src={"data:image/png;charset=utf-8;base64,"+post.img} className={cssLightHandle("post-img", theme)} />
                </div>

                <div><hr className={cssLightHandle("vertical-hr", theme)} /></div>

                <div className="post-title-container">
                    <h1 className={cssLightHandle("post-title", theme)}>{post.title}</h1>
                </div>


                <div className={cssLightHandle("post-content", theme)}><p>{post.content}</p></div>
                
                <hr className={cssLightHandle("hr-post-comment-section", theme)} />

                <div className="post-comment-section">
                    <div className={cssLightHandle("post-comment-input-section", theme)}>
                        <textarea type="text" className={cssLightHandle("comment-input", theme)} ></textarea>
                        <button className="post-comment-btn"><img className="post-comment-btn-img" src={theme === "light" ? "/bubble_chat_black.png" : "/bubble_chat_white.png" } /></button>
                    </div>
                </div>
        </div>
    </div>
}

export default Post;