import React from "react";
import "./create-post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";


function CreatePost(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("create-menu", theme)}>
        <h1 className={cssLightHandle("title", theme)}>Create<hr className={cssLightHandle("", theme)} /></h1>
        <div className="data-forms-container">
            <div className="img-form-container">
                <h2 className={cssLightHandle("title-form", theme)}>Image<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                <div className={cssLightHandle("button transperent-button img-upload-div", theme)}>
                <label for="file-upload" class={cssLightHandle(" img-upload", theme)}>
                    Upload Image
                </label>
                <input id="file-upload" type="file" />
                </div>
            </div>
            <div className="text-form-container">
                <h2 className={cssLightHandle("title-form", theme)}>Title<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                <input className={cssLightHandle("title-input", theme)}></input>

                <h2 className={cssLightHandle("title-form", theme)}>Content<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                <div className={cssLightHandle("content-input-div", theme)}><textarea className={cssLightHandle("content-input", theme)}></textarea></div>
            </div>
        </div>
    </div>
}

export default CreatePost;