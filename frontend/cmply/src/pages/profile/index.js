import React, { useContext, useEffect, useState } from "react";
import UserAPIContext from "../../contexts/UserAPIContext";
import {
    Typography,
    Card,
    CardHeader,
    Avatar,
    CardContent,
} from "@mui/material";
import "./profile.css";
import VersePosts from "../../components/VersePosts";

const UserProfile = () => {
    const { username, userId } = useContext(UserAPIContext);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/posts/user/${userId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserPosts(data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="user-profile">
            <Card sx={{ width: 600 }}>
                <CardHeader
                    title={"Welcome back, " + username + "!"}
                    titleTypographyProps={{ fontSize: 20 }}
                    align="left"
                    avatar={
                        <Avatar sx={{ bgcolor: "#D27D2D" }}>
                            {username !== undefined &&
                                username[0] !== undefined &&
                                username[0].toUpperCase()}
                        </Avatar>
                    }
                />
                <CardContent align="center">
                    {userPosts !== undefined && userPosts.length > 0 ? (
                        <div>
                            <Typography align="center" fontStyle={"italic"}>
                                Your posts
                            </Typography>
                            <VersePosts
                                versePosts={userPosts}
                                userId={userId}
                                userSpecific={true}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;
