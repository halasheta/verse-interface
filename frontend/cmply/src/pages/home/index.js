import { Typography } from "@mui/material";
import React, { useContext } from "react";
import UserAPIContext from "../../contexts/UserAPIContext";
import "./home.css";

const WelcomePage = () => {
    const { username } = useContext(UserAPIContext);
    return (
        <div className="welcome-page">
            {username === "" ? (
                <div className="home-title">
                    <Typography
                        color="primary"
                        align="center"
                        fontSize={48}
                        fontWeight={4}>
                        Welcome to Compassionately!
                    </Typography>
                    <Typography fontSize={20} color="#808080">
                        A tool created to increase understanding and raise
                        awareness on the plurality of beliefs within the Muslim
                        community.
                    </Typography>
                </div>
            ) : (
                <div className="home-title">
                    <Typography
                        color="primary"
                        align="center"
                        fontSize={48}
                        fontWeight={4}>
                        Welcome back, {username}!
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
