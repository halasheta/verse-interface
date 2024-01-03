import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./verses.css";
import VerseCard from "../../components/VerseCard";
import VersesAPIContext from "../../contexts/VersesAPIContext";
import LoadingScreen from "../../components/LoadingScreen";
import ChaptersAPIContext from "../../contexts/ChaptersAPIContext";

const Verses = () => {
    const { verses, setVerses, chapter, setChapter } =
        useContext(VersesAPIContext);
    const { chapters } = useContext(ChaptersAPIContext);
    const { num } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        let c = chapters.find((obj) => obj.num === parseInt(num));
        setChapter(c);

        fetch(`http://localhost:8000/quran/${c.id}/verses/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.sort((a, b) => a.num - b.num);
                setVerses(data);
            })
            .catch((err) => console.log(err));
    }, [num]);

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className="verses">
                    <h2>{chapter.name_eng}</h2>
                    <h2
                        style={{
                            fontFamily: ["'Noto Naskh Arabic'", "serif"].join(
                                ","
                            ),
                        }}>
                        {" "}
                        {" (" + chapter.name_ara + ")"}
                    </h2>
                    {verses !== undefined &&
                        verses.map((verse, i) => (
                            <div
                                className="verse-display"
                                key={"verse-display-" + i}>
                                <VerseCard verse={verse} chapter={chapter} />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Verses;
