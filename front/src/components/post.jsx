import React, { useState } from "react";
import "./post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useEffect } from "react";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';

function Post(props)
{
    const { postId } = useParams();
    const theme = useContext(globalThemeContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [post, setPost] = useState({});

    function commentChange(event)
    {
        setComment(event.target.value);
    }

    function submitComment()
    {
        axios.post(window.location.origin + "/api" + window.location.pathname + "/comments", {
            content: comment,
        })
        .then((response) => {
            console.log(response.data);
            getComments();
        })
        .catch((err) => {
            enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
        });
    }

    function getComments()
    {
        console.log(window.location.origin + "/api" + window.location.pathname + "/comments");
        axios.get(window.location.origin + "/api" + window.location.pathname + "/comments")
        .then((response) =>
        {
            console.log(response.data);
            setComments(response.data);
        });
    }

    function createComment(comment)
    {
        return <Comment author={comment.author} content={comment.content} timestamp={new Date(comment.date).toLocaleDateString()} />
    }

    useEffect(() => {
        console.log(window.location.origin + "/api" + window.location.pathname);
        axios.get(window.location.origin + "/api" + window.location.pathname)
        .then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
        getComments();
    }, [postId]);

    return <div className="post-container">
        <div className="post-grid">
                {post.img ? 
                <div className="post-img-container">
                    <img src={"data:image/png;charset=utf-8;base64,"+post.img} className={cssLightHandle("post-img", theme)} /> 
                </div>
                : ""}

                {post.img ?  <div><hr className={cssLightHandle("vertical-hr", theme)} /></div> : ''}

                <div className={post.img ? "post-title-container" : "post-title-container no-img"}>
                    <h1 className={cssLightHandle("post-title", theme)}>{post.title}</h1>
                </div>


                <div className={cssLightHandle("post-content", theme)}><p>{post.content}</p></div>
                
                <hr className={cssLightHandle("hr-post-comment-section", theme)} />

                <div className="post-comment-section">
                    <div className={cssLightHandle("post-comment-input-section", theme)}>
                        <textarea type="text" onChange={commentChange} className={cssLightHandle("comment-input", theme)} ></textarea>
                        <button onClick={submitComment} className="post-comment-btn"><img className="post-comment-btn-img" src={theme === "light" ? "/bubble_chat_black.png" : "/bubble_chat_white.png" } /></button>
                    </div>
                    {comments.map(createComment)}
                </div>
        </div>
    </div>
}

export default Post;