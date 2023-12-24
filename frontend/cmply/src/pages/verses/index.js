import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./verses.css";
import VerseTable from '../../components/Quran/VerseTable';
import VersesAPIContext from '../../contexts/VersesAPIContext';


const Verses = () => {
    const { setVerses, chapter, setChapter } = useContext(VersesAPIContext);
    const { id } = useParams();

    

    // useEffect(() => {
    //     fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //        const verseArr = data.verses.map((verse) => ({
    //         ...verse, 
    //         chapter_number: parseInt(verse.verse_key[0]),
    //         verse_number: parseInt(verse.verse_key.split(':')[1])
    //        }));
    //        setVerses(verseArr);
    //        setChapter(data.meta.filters.chapter_number)
    //     })
    //     .catch(err => console.log(err)) 

    //     fetch(`https://api.quran.com/api/v4/quran/translations/131?chapter_number=${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         // TODO: clean text from the footnote brackets
    //        setTransVerses(data.translations);
    //     })
    //     .catch(err => console.log(err)) 
    // })


    useEffect(() => {
        fetch(`http://localhost:8000/quran/${id}/verses/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => a.num - b.num);
            setVerses(data);
        })
        .catch(err => console.log(err));

        fetch(`http://localhost:8000/quran/chapter/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setChapter(data);
        })
        .catch(err => console.log(err));

    })
    
    return (
        <div className='verses'>
            <h2>{chapter.name_eng + " (" + chapter.name_ara + ")"}</h2>
            <VerseTable perPage={10} page={1}></VerseTable>
        </div>
    );
}

export default Verses;