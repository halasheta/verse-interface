import React, { useEffect, useState, useContext } from "react";
import { Accordion } from "@mui/material";
import { styled } from "@mui/material/styles";

import UserAPIContext from "../../contexts/UserAPIContext";
import "../../pages/singleVerse/singleVerse.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Comment from "../Comment";

const CommentThread = ({
    comments,
    uLikes = [],
    uDislikes = [],
    nLikes = {},
    nDislikes = {},
    margin = 5,
    setup = false,
}) => {
    const MARGIN = 10 + margin;
    const { userId } = useContext(UserAPIContext);

    const [liked, setLiked] = useState(uLikes);
    const [numLikes, setNumLikes] = useState(nLikes);

    const [disliked, setDisliked] = useState(uDislikes);
    const [numDislikes, setNumDislikes] = useState(nDislikes);

    const [currComments, setCurrComments] = useState([]);

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
            {...props}
        />
    ))(({ theme }) => ({
        flexDirection: "row-reverse",
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-90deg)",
        },
        "& .MuiAccordionSummary-content": {
            marginLeft: theme.spacing(1),
        },
    }));

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
            let v2 = comments[i].dislikes;

            nLikes[comments[i].id] = v1.length;
            nDislikes[comments[i].id] = v2.length;

            if (v1.find((e) => e.user === userId)) {
                // the user already liked this comment
                setLiked((lst) => [...lst, comments[i].id]);
            }

            if (v2.find((e) => e.user === userId)) {
                // the user already disliked this comment
                setDisliked((lst) => [...lst, comments[i].id]);
            }

            comments[i].responses = [];
        }

        setNumLikes(nLikes);
        setNumDislikes(nDislikes);

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

    const styleOuter = {
        border: "none",
        boxShadow: "none",
        marginLeft: MARGIN,
        marginTop: "1rem",
    };

    const styleInner = {
        boxShadow: "none",
        marginLeft: MARGIN,
    };
    return (
        <div>
            {currComments.length > 0 && (
                <Accordion style={setup ? styleOuter : styleInner}>
                    <AccordionSummary style={{ fontSize: "0.9rem" }}>
                        {currComments.length}{" "}
                        {currComments.length === 1 ? "Reply" : "Replies"}
                    </AccordionSummary>
                    {currComments.map((comment, i) => (
                        <div>
                            <Comment
                                comment={comment}
                                liked={liked}
                                setLiked={setLiked}
                                numLikes={numLikes}
                                setNumLikes={setNumLikes}
                                disliked={disliked}
                                setDisliked={setDisliked}
                                numDislikes={numDislikes}
                                setNumDislikes={setNumDislikes}
                                comments={currComments}
                                setCurrComments={setCurrComments}
                            />

                            {comment !== undefined &&
                                comment.responses.length > 0 && (
                                    <CommentThread
                                        key={"c-thread-" + comment.id}
                                        comments={comment.responses}
                                        uLikes={liked}
                                        uDislikes={disliked}
                                        nLikes={numLikes}
                                        nDislikes={numDislikes}
                                        margin={MARGIN}
                                    />
                                )}
                        </div>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default CommentThread;
