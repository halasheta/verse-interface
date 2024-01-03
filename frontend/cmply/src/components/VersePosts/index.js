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
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserAPIContext from "../../contexts/UserAPIContext";
import VersesAPIContext from "../../contexts/VersesAPIContext";

const VersePosts = ({ versePosts, userId, userSpecific = false }) => {
    const [liked, setLiked] = useState([]);
    const [numLikes, setNumLikes] = useState([]);
    const [currPosts, setCurrPosts] = useState(versePosts);

    const { username } = useContext(UserAPIContext);
    const { chapter, verses } = useContext(VersesAPIContext);

    useEffect(() => {
        for (let i = 0; i < currPosts.length; i++) {
            let v = versePosts[i].likes;
            let l = 0;
            if (v.find((e) => e.user === userId)) {
                // the user already liked this post
                l = 1;
            }
            setLiked((lst) => [...lst, l]);
            setNumLikes((lst) => [...lst, v.length]);
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

    const unlikePost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/unlike/`, {
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
        <div className="verse-posts">
            {currPosts.map((versePost, i) => (
                <div className="verse-post" key={"verse-post-" + i}>
                    <Card sx={{ width: 500 }}>
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
                        <CardActions
                            disableSpacing
                            className="right-align-item">
                            {numLikes[i]}
                            {liked[i] === 0 && (
                                <IconButton onClick={() => likePost(i)}>
                                    <FavoriteIcon />
                                </IconButton>
                            )}
                            {liked[i] === 1 && (
                                <IconButton onClick={() => unlikePost(i)}>
                                    <FavoriteIcon color="primary" />
                                </IconButton>
                            )}
                        </CardActions>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default VersePosts;
