import React, { useEffect } from "react";
import "./edit-post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useParams } from "react-router-dom";

function EditPost(props)
{
    const navigate = useNavigate();

    const { postId } = useParams();

    const [image, setImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [imageShow, setImageShow] = useState(null);
    const [deleteImageStatus, setDeleteImageStatus] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    function setDeleteImage()
    {
        setDeleteImageStatus(true);
    }

    function titleChange(event)
    {
        setTitle(event.target.value);
    }

    function contentChange(event)
    {
        setContent(event.target.value);
    }

    function checkImageShow()
    {
        console.log("sdf: ", !image && originalImage && !deleteImageStatus);
        if(image)
        { 
            setImageShow(URL.createObjectURL(image));
        }
        else if(!image && originalImage && !deleteImageStatus)
        {
            setImageShow(originalImage);
        }
        else
        {
            setImageShow(null);
        }
    }

    function fileUpload(event)
    {
        setDeleteImageStatus(false);
        setImage(null);
        setImage(event.target.files[0]);
    }

    function getPost()
    {
        axios.get("http://localhost:3000/api/posts/" + postId)
        .then((response) => {
            setTitle(response.data.title);
            setContent(response.data.content);
            if(response.data.img)
            {
                setOriginalImage("data:image/png;charset=utf-8;base64," + response.data.img);
            }
        })
        .catch((err) => {
            enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
        })
    }

    function submitPost(event)
    {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("title", title);
        formData.append("deleteImage", deleteImageStatus ? "true" : "");
        formData.append("content", content);
        
        axios.patch("http://localhost:3000/api/edit/" + postId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },   
        })
        .then((response) => {
            if(response.data === "success")
            {
                navigate("/posts/" + postId);
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

    useEffect(() => {
        checkImageShow();
    }, [image, originalImage, deleteImageStatus]);

    useEffect(() => {
        getPost();
    }, []);

    return <div className={cssLightHandle("create-menu", theme)}>
        <h1 className={cssLightHandle("title", theme)}>Edit<hr className={cssLightHandle("", theme)} /></h1>
        <div className="create-forms-container">
            <div className="data-forms-container">
                <div className="img-form-container">
                    <h2 className={cssLightHandle("title-form", theme)}>Image<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    {imageShow ? <div className="img-preview-div"><img src={imageShow} className={cssLightHandle("img-preview", theme)} /></div>: ""}
                    
                    {!deleteImageStatus && !image && originalImage ?
                     <button id="delete-image-button" className="button transperent-button" onClick={setDeleteImage}>Delete</button>
                    : ""}

                    <div className={cssLightHandle("button transperent-button img-upload-div", theme)}>
                        <label htmlFor="file-upload" className={cssLightHandle("img-upload", theme)}>
                            <div>Upload Image</div>
                        </label>
                        <input id="file-upload" type="file" onChange={fileUpload} accept="image/jpg,image/jpeg,image/png" />
                    </div>
                </div>
                <div className="text-form-container">
                    <h2 className={cssLightHandle("title-form", theme)}>Title<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    <input className={cssLightHandle("title-input", theme)} onChange={titleChange} value={title} ></input>

                    <h2 className={cssLightHandle("title-form", theme)}>Content<hr className={cssLightHandle("thick-h2", theme)} /></h2>
                    <div className={cssLightHandle("content-input-div", theme)} onChange={contentChange}><textarea value={content} className={cssLightHandle("content-input", theme)}></textarea></div>
                </div>
            </div>
            <div className="button-create-container">
                <button className={cssLightHandle("button filled-button submit-button", theme)} onClick={submitPost}>Submit</button>
            </div>
        </div>
    </div>
}

export default EditPost;