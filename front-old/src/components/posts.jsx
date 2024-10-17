import React, { useState } from "react";
import "./posts.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext, useEffect } from "react";
import PostCard from "./post-card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';
import { backendUrl } from "../constants/backend";

function Posts(props)
{
    const { userId, postName } = useParams();

    const theme = useContext(globalThemeContext);
    const [posts, setPosts] = useState([]);

    const PostCardsType = props.type === "user-posts" ? "user-card" : "";
    const title = props.type === "user-posts" ? "My Posts" : "Posts";

    function deletePost(postId)
    {
        axios.delete(backendUrl + "/api/posts/" + postId)
        .then((response) => {
            getPosts();
        })
        .catch((err) => {
            enqueueSnackbar(err.response.data, { variant: "error", autoHideDuration: 1000 });
        })
    }

    function getPosts()
    {
        axios.get(backendUrl + "/api" + window.location.pathname)
        .then((response) => {
            setPosts(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        getPosts();
    }, [userId, postName]);

    function createPostCard(post)
    {
        return <PostCard type={PostCardsType} deleteFunc={deletePost} imgSrc={post.img} title={post.title} description={post.content} postId={post.postId} />
    }

    return <div className={cssLightHandle("posts-content", theme)}>
        <h1 className={cssLightHandle("title", theme)}>{title}<hr className={cssLightHandle("", theme)} /></h1>
        <div className="posts-container">
        {posts.map(createPostCard)}
        </div>
    </div>
}

export default Posts;