import React, { useState, useContext } from "react";
import { CARD_WIDTH } from "../../pages/singleVerse";
import Avatar from "@mui/material/Avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
    Typography,
    Tooltip
} from "@mui/material";
import UserAPIContext from "../../contexts/UserAPIContext";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Post = ({ post, userSpecific }) => {
    const { username } = useContext(UserAPIContext);
    const { chapter, verses } = useContext(VersesAPIContext);

    const likePost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                post: post.id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 201) {
                    return Promise.reject(res);
                } else {
                    const arr1 = liked.slice();
                    const arr2 = numLikes.slice();

                    arr1[i] = 1;
                    arr2[i] = arr2[i] + 1;

                    setLiked(arr1);
                    setNumLikes(arr2);
                }
            })
            .catch((err) => console.log(err));
    };

    const dislikePost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/dislike/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                post: post.id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 201) {
                    return Promise.reject(res);
                } else {
                    const arr1 = disliked.slice();
                    const arr2 = numDislikes.slice();

                    arr1[i] = 1;
                    arr2[i] = arr2[i] + 1;

                    setDisliked(arr1);
                    setNumDislikes(arr2);
                }
            })
            .catch((err) => console.log(err));
    };

    const removeLike = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/del/like/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                post: post.id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 204) {
                    return Promise.reject(res);
                } else {
                    const arr1 = liked.slice();
                    const arr2 = numLikes.slice();

                    arr1[i] = 0;
                    arr2[i] = arr2[i] - 1;

                    setLiked(arr1);
                    setNumLikes(arr2);
                }
            })
            .catch((err) => console.log(err));
    };

    const removeDislike = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/del/dislike/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                post: post.id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 204) {
                    return Promise.reject(res);
                } else {
                    const arr1 = disliked.slice();
                    const arr2 = numDislikes.slice();

                    arr1[i] = 0;
                    arr2[i] = arr2[i] - 1;

                    setDisliked(arr1);
                    setNumDislikes(arr2);
                }
            })
            .catch((err) => console.log(err));
    };

    const delPost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/del/${post.id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then(async (res) => {
                if (res.status !== 204) {
                    return Promise.reject(res);
                }
                setCurrPosts(currPosts.filter((p) => p.id !== post.id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="verse-post" key={"verse-post-" + i}>
            <Card
                sx={{
                    width: CARD_WIDTH,
                }}>
                <CardHeader
                    align="left"
                    avatar={
                        <Avatar sx={{ color: "deepOrange" }}>
                            {userSpecific
                                ? username[0].toUpperCase()
                                : post.user["username"][0].toUpperCase()}
                        </Avatar>
                    }
                    title={
                        (userSpecific ? username : post.user["username"]) +
                        " • " +
                        new Date(post.date_created).toDateString().slice(4)
                    }
                    action={
                        post.user["id"] === userId && (
                            <Tooltip title="Delete">
                                <IconButton onClick={() => delPost(i)}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                />
                <CardContent align="left">
                    {post.text !== undefined && post.text}
                    {!userSpecific && (
                        <Typography
                            fontSize={12}
                            fontStyle={"italic"}
                            color={"#808080"}>
                            {post.verses.length > 1 ? "Verses " : "Verse "}
                            {chapter.num +
                                ":" +
                                verses.find((obj) => obj.id === post.verses[0])
                                    .num}

                            {post.verses.length > 1 &&
                                " – " +
                                    chapter.num +
                                    ":" +
                                    verses.find(
                                        (obj) =>
                                            obj.id ===
                                            post.verses[post.verses.length - 1]
                                    ).num}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <div>
                        {liked[i] === 0 && (
                            <IconButton onClick={() => likePost(i)}>
                                <ThumbUpAltIcon />
                            </IconButton>
                        )}
                        {liked[i] === 1 && (
                            <IconButton onClick={() => removeLike(i)}>
                                <ThumbUpAltIcon color="primary" />
                            </IconButton>
                        )}
                        {numLikes[i]}

                        {disliked[i] === 0 && (
                            <IconButton onClick={() => dislikePost(i)}>
                                <ThumbDownAltIcon />
                            </IconButton>
                        )}
                        {disliked[i] === 1 && (
                            <IconButton onClick={() => removeDislike(i)}>
                                <ThumbDownAltIcon color="primary" />
                            </IconButton>
                        )}
                        {numDislikes[i]}
                        <Tooltip title="Reply">
                            <IconButton onClick={() => setDisplayForm(true)}>
                                <ReplyIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
};

export default Post;
