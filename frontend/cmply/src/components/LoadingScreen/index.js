import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
    return (
        <div id="loadingScreen">
            <CircularProgress color="primary" />
        </div>
    );
};

export default LoadingScreen;
