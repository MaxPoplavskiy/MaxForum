import React from "react";
import "./posts.css";
import { globalThemeContext, cssLightHandle } from "../globalThemeContext";
import { useContext } from "react";
import PostCard from "./post-card";

function Posts(props)
{
    const theme = useContext(globalThemeContext);

    return <div className={cssLightHandle("posts-content", theme)}>
        <h1 className={cssLightHandle("title", theme)}>Posts<hr className={cssLightHandle("", theme)} /></h1>
        <div className="posts-container">
            <PostCard imgSrc="test.png" title="weaver weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
            <PostCard imgSrc="test.png" title="weaver" description="Weaver is known as a highly mobile and elusive hero, belonging to the Agility attribute. His abilities and unique mechanics make him a popular pick for players who enjoy playing a slippery, hard-to-catch hero capable of dealing significant damage." />
        </div>
    </div>
}

export default Posts;