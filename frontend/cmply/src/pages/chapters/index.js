import React, { useContext, useEffect, useState } from 'react';
import "./chapters.css";
import ChapterTable from '../../components/Quran/ChapterTable';
import ChaptersAPIContext from '../../contexts/ChaptersAPIContext';

const Chapters = () => {

    const { chapters, setChapters } = useContext(ChaptersAPIContext);

    // useEffect(() => {
    //     fetch(`https://api.quran.com/api/v4/chapters`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         setChapters(data.chapters);
    //     })
    //     .catch(err => console.log(err))

    // })

    useEffect(() => {
        fetch(`http://localhost:8000/quran/all/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setChapters(data);
        })
        .catch(err => console.log(err))
    }
    )
    
    return (
        <div className='chapters'>
            <h2>The Qur'an</h2>
            <ChapterTable perPage={10} page={1}></ChapterTable>
        </div>
    );
}

export default Chapters;