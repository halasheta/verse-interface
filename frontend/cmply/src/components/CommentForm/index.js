import React, { useState, useContext, useEffect } from "react";
import UserAPIContext from "../../contexts/UserAPIContext";
import LoadingContext from "../../contexts/LoadingContext";
import { CARD_WIDTH } from "../../pages/singleVerse";
import "../../pages/singleVerse/singleVerse.css";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const CommentForm = ({
    postId,
    setDisplayForm,
    parent = null,
    nested = false,
}) => {
    const styleNested = { marginTop: "1rem", marginBottom: "1rem" };
    const styleOutter = { marginTop: "1rem", width: CARD_WIDTH };

    const { username, userId } = useContext(UserAPIContext);
    const { setIsLoading } = useContext(LoadingContext);

    const [text, setText] = useState("");

    const submitComm = () => {
        fetch("http://127.0.0.1:8000/comments/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                text: text,
                user: userId,
                post: postId,
                parent: parent,
            }),
        }).then((res) => {
            if (res.status !== 201) {
                return Promise.reject(res);
            }
            setText("");
            setIsLoading(true);
        });
    };

    return (
        <div className="comment-form">
            <Card sx={nested ? styleNested : styleOutter}>
                <CardHeader
                    align="left"
                    avatar={
                        <Avatar sx={{ bgcolor: "#D27D2D" }}>
                            {username !== undefined &&
                                username[0] !== undefined &&
                                username[0].toUpperCase()}
                        </Avatar>
                    }
                    title={username}
                    titleTypographyProps={{ fontSize: 13 }}
                    action={
                        <IconButton onClick={() => setDisplayForm(false)}>
                            <CloseIcon />
                        </IconButton>
                    }
                />

                <CardContent>
                    <TextField
                        variant="standard"
                        multiline
                        fullWidth
                        align="left"
                        InputProps={{
                            style: { fontSize: 14, minRows: 2 },
                        }}
                        placeholder="What are your thoughts?"
                        onChange={(e) => setText(e.target.value)}
                    />
                </CardContent>

                <CardActions disableSpacing className="right-align-post">
                    <IconButton onClick={submitComm}>
                        <SendIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default CommentForm;
