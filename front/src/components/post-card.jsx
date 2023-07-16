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
            <div className={cssLightHandle("card-img-div", theme)}><img src={props.imgSrc} className={cssLightHandle("card-img", theme)} /></div>
            <div className={cssLightHandle("card-title-div", theme)}>
                <h2 className={cssLightHandle("card-title", theme)}>{props.title}</h2>
                <hr className={cssLightHandle("hr-card-title", theme)} />
            </div>
        </div>
        <div>
            <p className={cssLightHandle("card-description", theme)}>{props.description}</p>
            <div className="more-div">
                <Link className={cssLightHandle("more-link", theme)}>More</Link>
                <hr className={cssLightHandle("hr-card-title", theme)} />
            </div>
        </div>
    </div>
}

export default PostCard;