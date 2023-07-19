import React from "react";
import "./post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import Comment from "./comment";

function Post(props)
{
    const theme = useContext(globalThemeContext);

    return <div className="post-container">
        <div className="post-grid">
                <div className="post-img-container">
                    <img src="/test.png" className={cssLightHandle("post-img", theme)} />
                </div>

                <div><hr className={cssLightHandle("vertical-hr", theme)} /></div>

                <div className="post-title-container">
                    <h1 className={cssLightHandle("post-title", theme)}>Тітул</h1>
                </div>


                <div className={cssLightHandle("post-content", theme)}><p>Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage.</p></div>
                
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