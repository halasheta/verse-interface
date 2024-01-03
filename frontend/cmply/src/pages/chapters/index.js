import React, { useContext, useEffect, useState } from "react";
import "./chapters.css";
import ChapterTable from "../../components/ChapterTable";
import ChaptersAPIContext from "../../contexts/ChaptersAPIContext";
import LoadingScreen from "../../components/LoadingScreen";

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
                    <h2>The Qur'an</h2>
                    <ChapterTable perPage={10} page={1}></ChapterTable>
                </div>
            )}
        </div>
    );
};

export default Chapters;
