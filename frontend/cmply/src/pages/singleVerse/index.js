import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Card,
    TextField,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./singleVerse.css";
import UserAPIContext from "../../contexts/UserAPIContext";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import LoadingScreen from "../../components/LoadingScreen";
import VersePosts from "../../components/VersePosts";
export const CARD_WIDTH = 700;
const SingleVerse = () => {
    const [post, setPost] = useState("");
    const [versePosts, setVersePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { chapter, verses } = useContext(VersesAPIContext);
    const { username, userId } = useContext(UserAPIContext);

    const { num } = useParams();
    const [verseNum, setVerseNum] = useState(parseInt(num));

    const last = useRef(0);
    const verse = useRef({});

    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        if (
            verses !== undefined &&
            verses[verses.length - 1] !== undefined &&
            num !== undefined
        ) {
            last.current = verses[verses.length - 1].num;
            verse.current = verses[parseInt(num) - 1];

            fetch(`http://127.0.0.1:8000/posts/verse/${verse.current.id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setVersePosts(data);
                })
                .catch((err) => console.log(err));
        }
    }, [num, isLoading]);

    const goBack = () => {
        let next = parseInt(num) - 1;
        setVerseNum(next);
        navigate("/quran/verse/" + next);
    };

    const goForward = () => {
        let next = parseInt(num) + 1;
        setVerseNum(next);
        navigate("/quran/verse/" + next);
    };

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
            // return res.json();
            setIsLoading(true);
        });
    };

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div
                    className="verse-page"
                    key={"verse-page-" + verse.current.id}
                    id={verse.current.id}>
                    <Card
                        variant="outlined"
                        sx={{
                            width: CARD_WIDTH,
                            border: "none",
                            boxShadow: "none",
                        }}>
                        {num !== undefined && parseInt(num) === 1 && (
                            <IconButton disabled>
                                <ArrowBackIcon />
                            </IconButton>
                        )}

                        {num !== undefined && parseInt(num) !== 1 && (
                            <IconButton onClick={goBack}>
                                <ArrowBackIcon color="primary" />
                            </IconButton>
                        )}

                        {chapter !== undefined &&
                            verse.current !== undefined &&
                            chapter.num + ":" + verse.current.num}

                        {num !== undefined &&
                            parseInt(num) !== last.current && (
                                <IconButton onClick={goForward}>
                                    <ArrowForwardIcon color="primary" />
                                </IconButton>
                            )}

                        {num !== undefined &&
                            parseInt(num) === last.current && (
                                <IconButton disabled>
                                    <ArrowForwardIcon />
                                </IconButton>
                            )}
                    </Card>
                    <Card
                        variant="outlined"
                        className="verse-card"
                        sx={{ width: CARD_WIDTH, fontSize: 20 }}>
                        <CardContent
                            style={{
                                fontFamily: [
                                    "'Noto Naskh Arabic'",
                                    "serif",
                                ].join(","),
                            }}>
                            {verse.current !== undefined &&
                                verse.current.text_ara}
                        </CardContent>
                    </Card>
                    <Card
                        variant="outlined"
                        className="verse-card"
                        sx={{ width: CARD_WIDTH }}>
                        <CardContent>
                            <div>
                                {verse.current !== undefined &&
                                    verse.current.text_eng}
                            </div>
                        </CardContent>
                    </Card>
                    {username === "" ? (
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "#ff9d3f",
                                paddingTop: 10,
                            }}>
                            Please login to add your own interpretation!
                        </Link>
                    ) : (
                        <div className="user-post">
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
                                <TextField
                                    variant="standard"
                                    multiline
                                    sx={{ width: 450, minRows: 2 }}
                                    placeholder="Add an interpretation..."
                                    onChange={(e) =>
                                        setPost(e.target.value)
                                    }></TextField>
                                <CardActions
                                    disableSpacing
                                    className="right-align-post">
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
                                            verse.current !== undefined &&
                                            verse.current.num
                                        }
                                        min={
                                            verse.current !== undefined &&
                                            verse.current.num
                                        }
                                        max={
                                            verses !== undefined &&
                                            verses.length
                                        }
                                        style={{ fontSize: 14 }}
                                        onChange={(e) =>
                                            setVerseNum(e.target.value)
                                        }
                                    />

                                    <IconButton onClick={submitPost}>
                                        <SendIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </div>
                    )}

                    {versePosts !== undefined && (
                        <VersePosts versePosts={versePosts} userId={userId} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleVerse;
