import React from "react";
import "./post-card.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


function PostCard(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("card-container", theme)}>
        <div className={cssLightHandle("upperbody-card", theme)}>
            {props.imgSrc ? <div className={cssLightHandle("card-img-div", theme)}><img src={"data:image/png;charset=utf-8;base64,"+props.imgSrc} alt="postcard image" className={cssLightHandle("card-img", theme)} /></div> : ""} 
            <div className={cssLightHandle("card-title-div", theme)}>
                <h2 className={cssLightHandle("card-title", theme)}>{props.title}</h2>
                <hr className={cssLightHandle("hr-card-title", theme)} />
            </div>
        </div>
        <div>
            <p className={cssLightHandle("card-description", theme)}>{props.description}</p>
        </div>
        <div className="lowerbody-card">
            <div></div>
            <div className="more-div">
                <Link to={"/posts/"+props.postId} className={cssLightHandle("more-link", theme)}>More</Link>
                <hr className={cssLightHandle("hr-more", theme)} />
            </div>
            <div className="post-action-buttons">
                {props.type === "user-card" ? <Link to={"/edit/" + props.postId} className="btn-edit-card"><img className="img-edit" alt="edit button image" src={theme === "light" ? "/edit-white.png" : "/edit-black.png"} /></Link> : ""}
                {props.type === "user-card" ? <button onClick={() => props.deleteFunc(props.postId)} className="btn-delete-card"><img className="img-delete" alt="delete button image" src={theme === "light" ? "/trashcan-black.png" : "/trashcan-white.png"} /></button> : ""}
            </div>
        </div>
    </div>
}

export default PostCard;