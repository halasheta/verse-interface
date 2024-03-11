import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./singleVerse.css";
import UserAPIContext from "../../contexts/UserAPIContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import LoadingScreen from "../../components/LoadingScreen";
import VersePosts from "../../components/VersePosts";
import PostForm from "../../components/PostForm";

export const CARD_WIDTH = 700;
const SingleVerse = () => {
    const [versePosts, setVersePosts] = useState([]);

    const { chapter, verses } = useContext(VersesAPIContext);
    const { username, userId, isSuperUser } = useContext(UserAPIContext);
    const { num } = useParams();
    const [verseNum, setVerseNum] = useState(parseInt(num));
    const [isLoading, setIsLoading] = useState(true);

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
                        sx={{
                            width: CARD_WIDTH,
                            border: "none",
                        }}>
                        <CardContent>
                            <div
                                style={{
                                    fontFamily: [
                                        "'Noto Naskh Arabic'",
                                        "serif",
                                    ].join(","),
                                    fontSize: 20,
                                }}>
                                {verse.current !== undefined &&
                                    verse.current.text_ara}
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                {verse.current !== undefined &&
                                    verse.current.text_eng}
                            </div>
                        </CardContent>
                    </Card>

                    {username === "" && (
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "#ff9d3f",
                                paddingTop: 10,
                            }}>
                            Please login to add your own interpretation!
                        </Link>
                    )}
                    {isSuperUser && <PostForm verse={verse} vNum={verseNum} />}

                    {versePosts !== undefined && (
                        <VersePosts versePosts={versePosts} userId={userId} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleVerse;
