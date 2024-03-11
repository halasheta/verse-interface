import React, { useContext, useState } from "react";
import { CARD_WIDTH } from "../../pages/singleVerse";
import {
    Card,
    TextField,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import UserAPIContext from "../../contexts/UserAPIContext";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import LoadingContext from "../../contexts/LoadingContext";

const PostForm = ({ verse, vNum }) => {
    const [verseNum, setVerseNum] = useState(vNum);

    const { username, userId } = useContext(UserAPIContext);
    const { chapter, verses } = useContext(VersesAPIContext);
    const { setIsLoading } = useContext(LoadingContext);

    const [post, setPost] = useState("");

    const submitPost = () => {
        let postVerses = [];
        let n = verseNum - verse.current.num + 1;
        for (let i = 0; i < n; i++) {
            postVerses.push(verse.current.id + i);
        }

        fetch("http://127.0.0.1:8000/posts/add/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                text: post,
                verses: postVerses,
                user: userId,
            }),
        }).then((res) => {
            if (res.status !== 201) {
                return Promise.reject(res);
            }
            setPost("");
            setIsLoading(true);
        });
    };

    return (
        <div className="post-form">
            <Card sx={{ width: CARD_WIDTH }}>
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
                />
                <CardContent>
                    <TextField
                        variant="standard"
                        multiline
                        align="left"
                        fullWidth
                        placeholder="Add an interpretation..."
                        onChange={(e) => setPost(e.target.value)}
                    />
                </CardContent>
                <CardActions disableSpacing className="right-align-post">
                    <Typography fontSize={14}>
                        {chapter !== undefined &&
                            verse.current !== undefined &&
                            "Include verses " +
                                chapter.num +
                                ":" +
                                verse.current.num +
                                " – " +
                                chapter.num +
                                ": "}
                    </Typography>
                    <input
                        className="number-input"
                        value={verseNum}
                        type="number"
                        placeholder={
                            verse.current !== undefined && verse.current.num
                        }
                        min={verse.current !== undefined && verse.current.num}
                        max={verses !== undefined && verses.length}
                        style={{ fontSize: 14 }}
                        onChange={(e) => setVerseNum(e.target.value)}
                    />

                    <IconButton onClick={submitPost}>
                        <SendIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default PostForm;
