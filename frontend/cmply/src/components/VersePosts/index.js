import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
    Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserAPIContext from "../../contexts/UserAPIContext";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import CommentThread from "../CommentThread";
import { CARD_WIDTH } from "../../pages/singleVerse";

const VersePosts = ({ versePosts, userId, userSpecific = false }) => {
    const [liked, setLiked] = useState([]);
    const [numLikes, setNumLikes] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [numDislikes, setNumDislikes] = useState([]);
    const [currPosts, setCurrPosts] = useState(versePosts);

    const { username } = useContext(UserAPIContext);
    const { chapter, verses } = useContext(VersesAPIContext);

    useEffect(() => {
        for (let i = 0; i < currPosts.length; i++) {
            let v1 = versePosts[i].likes;
            let l1 = 0;
            if (v1.find((e) => e.user === userId)) {
                // the user already liked this post
                l1 = 1;
            }
            setLiked((lst) => [...lst, l1]);
            setNumLikes((lst) => [...lst, v1.length]);

            let v2 = versePosts[i].dislikes;
            let l2 = 0;
            if (v2.find((e) => e.user === userId)) {
                // the user already disliked this post
                l2 = 1;
            }
            setDisliked((lst) => [...lst, l2]);
            setNumDislikes((lst) => [...lst, v2.length]);
        }
    }, [currPosts]);

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

    const addComment = (i) => {};

    return (
        <div className="verse-posts">
            {currPosts.map((versePost, i) => (
                <div className="verse-post" key={"verse-post-" + i}>
                    <Card sx={{ width: CARD_WIDTH }}>
                        <CardHeader
                            align="left"
                            avatar={
                                <Avatar sx={{ color: "deepOrange" }}>
                                    {userSpecific
                                        ? username[0].toUpperCase()
                                        : versePost.user[
                                              "username"
                                          ][0].toUpperCase()}
                                </Avatar>
                            }
                            title={
                                userSpecific
                                    ? username
                                    : versePost.user["username"]
                            }
                            action={
                                versePost.user["id"] === userId && (
                                    <IconButton onClick={() => delPost(i)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                )
                            }
                        />
                        <CardContent align="left">
                            {versePost.text !== undefined && versePost.text}
                            {!userSpecific && (
                                <Typography
                                    fontSize={12}
                                    fontStyle={"italic"}
                                    color={"#808080"}>
                                    {versePost.verses.length > 1
                                        ? "Verses "
                                        : "Verse "}
                                    {chapter.num +
                                        ":" +
                                        verses.find(
                                            (obj) =>
                                                obj.id === versePost.verses[0]
                                        ).num}

                                    {versePost.verses.length > 1 &&
                                        " – " +
                                            chapter.num +
                                            ":" +
                                            verses.find(
                                                (obj) =>
                                                    obj.id ===
                                                    versePost.verses[
                                                        versePost.verses
                                                            .length - 1
                                                    ]
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
                                    <IconButton
                                        onClick={() => removeDislike(i)}>
                                        <ThumbDownAltIcon color="primary" />
                                    </IconButton>
                                )}
                                {numDislikes[i]}
                                <IconButton onClick={() => addComment(i)}>
                                    <ReplyIcon />
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>

                    {versePost.comments !== undefined && (
                        <CommentThread
                            comments={versePost.comments}
                            setup={true}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default VersePosts;
