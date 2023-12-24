import React, { useContext, useEffect, useRef, useState } from 'react';
import {Card, TextField, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './singleVerse.css';
import UserAPIContext from '../../contexts/UserAPIContext';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VersesAPIContext from '../../contexts/VersesAPIContext';


import VersePosts from '../../components/Posts/VersePosts';


const SingleVerse = () => {
    const [verse, setVerse] = useState({});
    const [post, setPost] = useState("");
    const [versePosts, setVersePosts] = useState([]);

    
    const [verseNum, setVerseNum] = useState(0);

    const { chapter, verses } = useContext(VersesAPIContext);
    const { username, userId } = useContext(UserAPIContext);

    const { num } = useParams();

    const last = useRef(0);
    

    let navigate = useNavigate();

    useEffect(() => 
        async function loadData(){
            if (verses !== undefined && verses[verses.length - 1] !== undefined) {
                last.current = verses[verses.length - 1].num;
            }

            if (num !== undefined) {
                setVerse(verses[parseInt(num) - 1]);
            }

            if (verse !== undefined) {
                await fetch(`http://127.0.0.1:8000/posts/verse/${verse.id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                })
                .then(res => res.json())
                .then(data => {
                    setVersePosts(data);
                })
                .catch(err => console.log(err));
                }

        loadData();
        
    })


    const goBack = () => {
        let next = parseInt(num) - 1;
        navigate('/quran/verse/' + next);
    }

    const goForward = () => {
        let next = parseInt(num) + 1;
        navigate('/quran/verse/' + next);
    }
    
    const submitPost = () => {
        let postVerses = [];
        let n = verseNum - verse.num + 1;
        for (let i = 0; i < n; i++){
            postVerses.push(verse.id + i);
        }
        
        fetch("http://127.0.0.1:8000/posts/add/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                "text": post,
                "verses": postVerses,
                "user": userId,
            })
        }).then(res => {
            if (res.status !== 201) {
                return Promise.reject(res)
            }
            setPost("");
        })
    }

    
    return (
        <div className='verse-page' key={'verse-page-' + verse.id} id={verse.id}>
            <Card variant="outlined" 
                sx={{ 
                    width: 500,
                    border: "none",
                    boxShadow: "none" }}>
                {num !== undefined && parseInt(num) === 1 &&
                    <IconButton disabled>
                        <ArrowBackIcon/>
                    </IconButton>}

                    {num !== undefined && parseInt(num) !== 1 &&
                    <IconButton onClick={goBack}>
                        <ArrowBackIcon color='primary'/>
                    </IconButton>}

                    
                    
                {chapter !== undefined &&
                    verse !== undefined && chapter.num + ":" + verse.num}

                {num !== undefined && parseInt(num) !== last.current &&
                    <IconButton onClick={goForward}>
                        <ArrowForwardIcon color='primary'/>
                    </IconButton>}




                {num !== undefined && parseInt(num) === last.current &&
                    <IconButton disabled>
                        <ArrowForwardIcon/>
                    </IconButton>}

                

            </Card>
            <Card 
                variant="outlined" className='verse-card'
                sx={{ width:500, fontSize:16}}>
                <CardContent>
                { verse !== undefined && verse.text_ara }
                </CardContent>
                
            </Card>
            <Card 
                variant="outlined" className='verse-card'
                sx={{ width:500 }}>
                <CardContent>
                    <div>{ verse !== undefined && verse.text_eng }</div>
                
                </CardContent>
            </Card>
           
           <div className='user-post'>
            <Card sx={{ width:500 }}>
                <CardHeader align='left'
                    avatar={<Avatar sx= {{ bgColor: deepOrange[100] }}>
                    { username !== undefined && username[0] !== undefined && username[0].toUpperCase() }
                    </Avatar>}
                    title={ username }
                />
                <TextField
                    variant='standard'
                    multiline
                    sx={{width: 450, minRows: 2}}
                    placeholder="Add an interpretation..."
                    onChange={e => setPost(e.target.value)}
                >
                </TextField>
                <CardActions disableSpacing className='right-align-post'>
                    <Typography fontSize={14}>
                        {chapter !== undefined &&
                        verse !== undefined && 
                        'Include verses ' + chapter.num + ":" + verse.num + " – " + chapter.num + ": "}

                    </Typography>
                        <input className='number-input'
                            value={verseNum}
                            type='number'
                            min={verse !== undefined && verse.num}
                            max={verses !== undefined && verses.length}
                            onChange={(e) => setVerseNum(e.target.value)}
                        />
                        
                    <IconButton onClick={submitPost}>
                        <SendIcon/>
                    </IconButton>
                </CardActions>
            
            </Card>

           </div>
            
            {versePosts !== undefined && <VersePosts versePosts={versePosts} userId={userId} /> }

        </div>
    );
}

export default SingleVerse;