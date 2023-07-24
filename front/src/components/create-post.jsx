import React from "react";
import "./create-post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from "react-router-dom";

function CreatePost(props)
{
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function titleChange(event)
    {
        setTitle(event.target.value);
    }

    function contentChange(event)
    {
        setContent(event.target.value);
    }

    function fileUpload(event)
    {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    function submitPost(event)
    {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("title", title);
        formData.append("content", content);
        
        axios.post(window.location.origin + "/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },   
        })
        .then((response) => {
            if(response.data === "success")
            {
                navigate("/my-posts");
            }
            else
            {
                enqueueSnackbar(response.data, { variant: "error", autoHideDuration: 1000 });
            }
        })
        .catch((err) =>
        {
            enqueueSnackbar(err, { variant: "error", autoHideDuration: 1000 });
        });
    }

    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("create-menu", theme)}>
        <h1 className={cssLightHandle("title", theme)}>Create<hr className={cssLightHandle("", theme)} /></h1>
        <div className="create-forms-container">
            <div className="data-forms-container">
                <div className="img-form-container">
                    <h2 className={cssLightHandle("title-form", theme)}>Image<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    {image ? <div className="img-preview-div"><img src={URL.createObjectURL(image)} alt="" className={cssLightHandle("img-preview", theme)} /></div>: ""}
                    <div className={cssLightHandle("button transperent-button img-upload-div", theme)}>
                    <label htmlFor="file-upload" className={cssLightHandle("img-upload", theme)}>
                        <div>Upload Image</div>
                    </label>
                    <input id="file-upload" type="file" onChange={fileUpload} accept="image/jpg,image/jpeg,image/png" />
                    </div>
                </div>
                <div className="text-form-container">
                    <h2 className={cssLightHandle("title-form", theme)}>Title<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    <input className={cssLightHandle("title-input", theme)} onChange={titleChange}></input>

                    <h2 className={cssLightHandle("title-form", theme)}>Content<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    <div className={cssLightHandle("content-input-div", theme)} onChange={contentChange}><textarea className={cssLightHandle("content-input", theme)}></textarea></div>
                </div>
            </div>
            <div className="button-create-container">
                <button className={cssLightHandle("button filled-button submit-button", theme)} onClick={submitPost}>Submit</button>
            </div>
        </div>
    </div>
}

export default CreatePost;