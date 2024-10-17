import React, { useState } from "react";
import "./post.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useEffect } from "react";
import Comment from "./comment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';
import { backendUrl } from "../constants/backend";

function Post(props)
{
    const { postId } = useParams();
    const theme = useContext(globalThemeContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [post, setPost] = useState({});
    const [currentVote, setCurrentVote] = useState("No vote");

    function getCurrentVote()
    {
        axios.get(backendUrl + "/api" + window.location.pathname + "/is_voted")
        .then((response) => {
            setCurrentVote(response.data);
        })
    }

    function commentChange(event)
    {
        setComment(event.target.value);
    }

    function submitComment()
    {
        axios.post(backendUrl + "/api" + window.location.pathname + "/comments", {
            content: comment,
        })
        .then((response) => {
            getComments();
        })
        .catch((err) => {
            enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
        });
    }

    function sendVote(vote)
    {
        axios.put(backendUrl + "/api" + window.location.pathname + "/votes", {
            vote: vote,
        })
        .then((response) => {
            getPost();
        })
        .catch((err) => {
            enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
        });
    }

    function getComments()
    {
        axios.get(backendUrl + "/api" + window.location.pathname + "/comments")
        .then((response) =>
        {
            setComments(response.data);
        });
    }

    function createComment(comment)
    {
        return <Comment author={comment.author} content={comment.content} timestamp={new Date(comment.create_date).toLocaleDateString()} />
    }

    function getPost()
    {
        axios.get(backendUrl + "/api" + window.location.pathname)
        .then((response) => {
            setPost(response.data);
        });
        getCurrentVote();
        getComments();
    }


    useEffect(() => {
        getPost();
    }, [postId]);

    return <div className="post-container">
        <div className="post-grid">
                {post.img ? 
                <div className="post-img-container">
                    <img src={"data:image/png;charset=utf-8;base64,"+post.img} alt="post image" className={cssLightHandle("post-img", theme)} /> 
                </div>
                : ""}

                {post.img ?  <div><hr className={cssLightHandle("vertical-hr", theme)} /></div> : ''}

                <div className={post.img ? "post-title-container" : "post-title-container no-img"}>
                    <h1 className={cssLightHandle("post-title", theme)}>{post.title}</h1>
                </div>


                <div className={cssLightHandle("post-content", theme)}><p>{post.content}</p></div>
                
                <div className="post-bottom-section">
                    <div className="post-vote-section">
                        <button className="post-vote-button" onClick={() => sendVote(true)} ><img alt="vote button" 
                            src={currentVote === "Like" ? "/up-arrow-green.png" : theme === "light" ? "/up-arrow-black.png" : "/up-arrow-white.png"} />
                        </button>
                        <h3 className={cssLightHandle("post-vote-number", theme)}>{post.voteCount}</h3>
                        <button className="post-vote-button" onClick={() => sendVote(false)} ><img alt="vote button" 
                            src={currentVote === "Dislike" ? "/down-arrow-red.png" : theme === "light" ? "/down-arrow-black.png" : "/down-arrow-white.png"} />
                        </button>
                    </div>
                    
                    <div className="post-info-section">
                        <h3 className={cssLightHandle("post-info-section-text", theme)}>{post.author}</h3>
                        <h3 className={cssLightHandle("post-info-section-text", theme)}>{new Date(post.date).toLocaleDateString()}</h3>
                    </div>
                </div>

                <hr className={cssLightHandle("hr-post-comment-section", theme)} />

                <div className="post-comment-section">
                    <div className={cssLightHandle("post-comment-input-section", theme)}>
                        <textarea type="text" onChange={commentChange} className={cssLightHandle("comment-input", theme)} ></textarea>
                        <button onClick={submitComment} className="post-comment-btn"><img className="post-comment-btn-img" alt="" src={theme === "light" ? "/bubble_chat_black.png" : "/bubble_chat_white.png" } /></button>
                    </div>
                    {comments.map(createComment)}
                </div>
        </div>
    </div>
}

export default Post;