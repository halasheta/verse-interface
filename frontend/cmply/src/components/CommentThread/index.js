import React, { useEffect, useState, useContext } from "react";
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
import { CARD_WIDTH } from "../../pages/singleVerse";

const CommentThread = ({ comments, margin = 0, setup = false }) => {
    const MARGIN = 20 + margin;
    const { username, userId } = useContext(UserAPIContext);

    const [liked, setLiked] = useState([]);
    const [numLikes, setNumLikes] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [numDislikes, setNumDislikes] = useState([]);
    const [currComments, setCurrComments] = useState([]);

    function buildCommTree(parent) {
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].parent === parent.id) {
                parent.responses.push({ ...comments[i] });
            }
        }
        for (let i = 0; i < parent.responses.length; i++) {
            buildCommTree(parent.responses[i]);
        }
    }
    const setupThreads = () => {
        for (let i = 0; i < comments.length; i++) {
            let v1 = comments[i].likes;
            if (v1.find((e) => e.user === userId)) {
                // the user already liked this comment
                setLiked((lst) => [...lst, comments[i].id]);
            }

            let v2 = comments[i].dislikes;
            if (v2.find((e) => e.user === userId)) {
                // the user already disliked this comment
                setDisliked((lst) => [...lst, comments[i].id]);
            }

            comments[i].responses = [];
        }

        const parents = comments.filter((c) => c.parent === null);
        const threadedList = parents;

        for (let i = 0; i < threadedList.length; i++) {
            buildCommTree(threadedList[i]);
        }

        setCurrComments(threadedList);
    };

    useEffect(() => {
        if (comments !== undefined && setup === true) {
            setupThreads();
        } else {
            setCurrComments(comments);
        }
    }, []);

    const likeComm = () => {};

    const dislikeComm = () => {};

    const removeLike = () => {};

    const removeDislike = () => {};

    const addComment = () => {};

    const delComment = () => {};
    return (
        <div>
            {currComments.map((comment, i) => (
                <div style={{ paddingLeft: MARGIN, paddingTop: 10 }}>
                    <Card
                        className="comment"
                        key={"comment-" + comment.id}>
                        <CardHeader
                            align="left"
                            avatar={
                                <Avatar sx={{ color: "deepOrange" }}>
                                    {comment.user.username[0].toUpperCase()}
                                </Avatar>
                            }
                            title={comment.user.username}
                            action={
                                comment.user.id === userId && (
                                    <IconButton onClick={() => delComment(i)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                )
                            }
                        />
                        <CardContent align="left">
                            {comment.text !== undefined && comment.text}
                        </CardContent>
                        <CardActions>
                            <div>
                                {!liked.includes(comment.id) && (
                                    <IconButton onClick={() => likeComm(i)}>
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                )}
                                {liked.includes(comment.id) && (
                                    <IconButton onClick={() => removeLike(i)}>
                                        <ThumbUpAltIcon color="primary" />
                                    </IconButton>
                                )}
                                {comment.likes.length}

                                {!disliked.includes(comment.id) && (
                                    <IconButton onClick={() => dislikeComm(i)}>
                                        <ThumbDownAltIcon />
                                    </IconButton>
                                )}

                                {disliked.includes(comment.id) && (
                                    <IconButton
                                        onClick={() => removeDislike(i)}>
                                        <ThumbDownAltIcon color="primary" />
                                    </IconButton>
                                )}
                                {comment.dislikes.length}
                            </div>

                            <IconButton onClick={() => addComment(i)}>
                                <ReplyIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    {comment !== undefined && comment.responses.length > 0 && (
                        <CommentThread
                            key={"thread-" + comment.id}
                            comments={comment.responses}
                            margin={MARGIN}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentThread;
