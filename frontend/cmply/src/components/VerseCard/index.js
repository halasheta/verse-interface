import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const VerseCard = ({ verse, chapter }) => {
    let navigate = useNavigate();
    return (
        <div id={"verse-card-" + verse.id}>
            <Card sx={{ width: 700 }}>
                <CardActionArea
                    onClick={() => {
                        navigate("/quran/verse/" + verse.num);
                    }}>
                    <CardHeader
                        title={chapter.num + ":" + verse.num}
                        align="left"
                        style={{ color: "#ff9d3f" }}
                    />
                    <CardContent>
                        <Typography
                            align="right"
                            style={{
                                fontSize: 20,
                                fontFamily: [
                                    "'Noto Naskh Arabic'",
                                    "serif",
                                ].join(","),
                            }}>
                            {verse.text_ara}
                        </Typography>
                        <Typography align="left">{verse.text_eng}</Typography>
                        <Typography
                            className="verse-footer"
                            fontSize={13}
                            align="right"
                            color="primary">
                            {verse.posts !== undefined
                                ? verse.posts.length
                                : "0"}
                            {verse.posts !== undefined &&
                            verse.posts.length !== 1
                                ? " Interpretations"
                                : " Interpretation"}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default VerseCard;
