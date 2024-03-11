import React, { useContext, useEffect, useState } from "react";
import "./chapters.css";
import ChapterList from "../../components/ChapterList";
import ChaptersAPIContext from "../../contexts/ChaptersAPIContext";
import LoadingScreen from "../../components/LoadingScreen";
import { Typography } from "@mui/material";

const Chapters = () => {
    const { setChapters } = useContext(ChaptersAPIContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        fetch(`http://localhost:8000/quran/all/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setChapters(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className="chapters">
                    <Typography
                        variant="h3"
                        style={{
                            fontFamily: ["'Noto Naskh Arabic'", "serif"].join(
                                ","
                            ),
                        }}>
                        ٱلۡقُرۡءَان
                    </Typography>
                    <ChapterList perPage={10} page={1}></ChapterList>
                </div>
            )}
        </div>
    );
};

export default Chapters;
