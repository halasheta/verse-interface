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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserAPIContext from "../../contexts/UserAPIContext";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import CommentThread from "../CommentThread";
import { CARD_WIDTH } from "../../pages/singleVerse";
import CommentForm from "../CommentForm";
import VersePost from "../VersePost";
import "./verseposts.css";

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

    return (
        <div className="verse-posts">
            {currPosts.map((versePost, i) => (
                <div className="verse-post" key={"verse-post-" + i}>
                    <VersePost
                        liked={liked}
                        setLiked={setLiked}
                        numLikes={numLikes}
                        setNumLikes={setNumLikes}
                        disliked={disliked}
                        setDisliked={setDisliked}
                        numDislikes={numDislikes}
                        setNumDislikes={setNumDislikes}
                        userSpecific={userSpecific}
                        index={i}
                        post={versePost}
                    />

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
