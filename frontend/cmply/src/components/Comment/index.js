import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
    Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import UserAPIContext from "../../contexts/UserAPIContext";
import "./comment.css";
import { CARD_WIDTH } from "../../pages/singleVerse";
import CommentForm from "../CommentForm";

const Comment = ({
    comment,
    liked,
    setLiked,
    numLikes,
    setNumLikes,
    disliked,
    setDisliked,
    numDislikes,
    setNumDislikes,
    comments,
    setCurrComments,
}) => {
    const { username, userId } = useContext(UserAPIContext);
    const [displayForm, setDisplayForm] = useState(false);

    console.log(userId);
    const likeComm = (id) => {
        fetch(`http://127.0.0.1:8000/comments/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                comment: id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 201) {
                    return Promise.reject(res);
                } else {
                    setLiked((lst) => [...lst, id]);
                    let x = numLikes[id] + 1;
                    setNumLikes({ ...numLikes, [id]: x });
                }
            })
            .catch((err) => console.log(err));
    };

    const removeLike = (id) => {
        fetch(`http://127.0.0.1:8000/comments/del/like/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                comment: id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 204) {
                    return Promise.reject(res);
                } else {
                    setLiked(liked.filter((c) => c !== id));
                    let x = numLikes[id] - 1;
                    setNumLikes({ ...numLikes, [id]: x });
                }
            })
            .catch((err) => console.log(err));
    };

    const dislikeComm = (id) => {
        fetch(`http://127.0.0.1:8000/comments/dislike/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                comment: id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 201) {
                    return Promise.reject(res);
                } else {
                    setDisliked((lst) => [...lst, id]);
                    let x = numDislikes[id] + 1;
                    setNumDislikes({ ...numDislikes, [id]: x });
                }
            })
            .catch((err) => console.log(err));
    };

    const removeDislike = (id) => {
        fetch(`http://127.0.0.1:8000/comments/del/dislike/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                comment: id,
                user: userId,
            }),
        })
            .then(async (res) => {
                if (res.status !== 204) {
                    return Promise.reject(res);
                } else {
                    setDisliked(disliked.filter((c) => c !== id));
                    let x = numDislikes[id] - 1;
                    setNumDislikes({ ...numDislikes, [id]: x });
                }
            })
            .catch((err) => console.log(err));
    };
    const delComment = () => {
        fetch(`http://127.0.0.1:8000/comments/del/${comment.id}/`, {
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
                setCurrComments(comments.filter((c) => c.id !== comment.id));
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="comment" key={comment.id} sx={{ width: CARD_WIDTH }}>
            <div className="avatar-section">
                <Avatar className="avatar">
                    {comment.user.username[0].toUpperCase()}
                </Avatar>
            </div>
            <div className="card-section">
                <Card
                    key={"comment-" + comment.id}
                    style={{
                        margin: "5px",
                    }}>
                    <CardHeader
                        className="card-header"
                        align="left"
                        title={
                            comment.user.username +
                            " • " +
                            new Date(comment.date_created)
                                .toDateString()
                                .slice(4)
                        }
                        titleTypographyProps={{ fontSize: 13 }}
                        action={
                            comment.user.id === userId && (
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={() => delComment(comment.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    />

                    <CardContent align="left" sx={{ fontSize: 13 }}>
                        {comment.text !== undefined && comment.text}
                    </CardContent>
                    <CardActions>
                        {!liked.includes(comment.id) && (
                            <IconButton
                                className="icon-button"
                                onClick={() => likeComm(comment.id)}>
                                <ThumbUpAltIcon />
                            </IconButton>
                        )}
                        {liked.includes(comment.id) && (
                            <IconButton onClick={() => removeLike(comment.id)}>
                                <ThumbUpAltIcon color="primary" />
                            </IconButton>
                        )}
                        {numLikes[comment.id]}

                        {!disliked.includes(comment.id) && (
                            <IconButton
                                className="icon-button"
                                onClick={() => dislikeComm(comment.id)}>
                                <ThumbDownAltIcon />
                            </IconButton>
                        )}

                        {disliked.includes(comment.id) && (
                            <IconButton
                                onClick={() => removeDislike(comment.id)}>
                                <ThumbDownAltIcon color="primary" />
                            </IconButton>
                        )}
                        {numDislikes[comment.id]}

                        <Tooltip title="Reply">
                            <IconButton
                                className="icon-button"
                                onClick={() => setDisplayForm(true)}>
                                <ReplyIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
                {username !== "" && displayForm && (
                    <CommentForm
                        nested={true}
                        setDisplayForm={setDisplayForm}
                        postId={comment.post}
                        parent={comment.id}
                    />
                )}
            </div>
        </div>
    );
};

export default Comment;
