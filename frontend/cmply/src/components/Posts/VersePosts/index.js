import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import {Card, CardContent, CardHeader, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const VersePosts = ({ versePosts, userId }) => {
    const [liked, setLiked] = useState([]);
    const [numLikes, setNumLikes] = useState([]);

    useEffect(() => {
        for (let i = 0; i < versePosts.length; i++) {
            let v = versePosts[i].likes;
            let l = 0;
            if (v.find(e => e.user === userId)) {
                // the user already liked this post
                l = 1;
            }
            setLiked(lst => [...lst, l]);
            setNumLikes(lst => [...lst, v.length]);
        }
    });    

    const likePost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                "post": post.id,
                "user": userId
            })
        }).then(async res => {
            if (res.status !== 201) {
                return Promise.reject(res)
            } else {
                const arr1 = liked.slice();
                const arr2 = numLikes.slice();

                arr1[i] = 1;
                arr2[i] = arr2[i] + 1;

                setLiked(arr1);
                setNumLikes(arr2);
            }
        });
    }

    const unlikePost = (i) => {
        let post = versePosts[i];

        fetch(`http://127.0.0.1:8000/posts/unlike/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                "post": post.id,
                "user": userId
            })
        }).then(async res => {
            if (res.status !== 204) {
                return Promise.reject(res)
            } else {
                const arr1 = liked.slice();
                const arr2 = numLikes.slice();

                arr1[i] = 0;
                arr2[i] = arr2[i] - 1;

                setLiked(arr1);
                setNumLikes(arr2);
            }
        });

    }
    return (
        <div className='verse-posts'>
           
            {  versePosts.map((versePost, i) => (
                    <div className='verse-post'>
                    <Card sx={{ width:500 }} >
                        <CardHeader align='left'
                            avatar={<Avatar sx= {{ color: 'deepOrange' }}>
                            { versePost.user["username"][0].toUpperCase() }
                            </Avatar>}
                            title={ versePost.user["username"]}
                        />
                        <CardContent align='left'>
                            {versePost.text !== undefined && versePost.text}
                        </CardContent>
                        <CardActions disableSpacing className='right-align-item'>
                            {numLikes[i]}
                            {liked[i] === 0 &&
                                <IconButton 
                                onClick={() => likePost(i)} 
                                >
                                    <FavoriteIcon/>
                                </IconButton> 
                            
                            }
                            {liked[i] === 1 &&
                                 <IconButton 
                                 onClick={() => unlikePost(i)} 
                                 >
                                     <FavoriteIcon color='primary'/>
                                 </IconButton>

                            }
                        </CardActions>

                        
                    </Card>
                    </div>
                )
                )}
            
           </div>

    );

}

export default VersePosts;