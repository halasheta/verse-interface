import {
    AppBar,
    Box,
    Typography,
    Menu,
    MenuItem,
    Toolbar,
    Link,
    Container,
    Button,
} from "@mui/material";

import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenHandle } from "../../pages/login";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import UserAPIContext from "../../contexts/UserAPIContext";

const NavBar = () => {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const { setUsername, setUserId } = useContext(UserAPIContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        sessionStorage.setItem("access", null);
        sessionStorage.setItem("refresh", null);
        setLoggedIn(false);
        setUsername("");
        setUserId(0);
        navigate("/");
    };

    useEffect(() => {
        tokenHandle().then((valid) => {
            if (!valid) {
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button href="/">
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ color: "white" }}>
                                compassionately
                            </Typography>
                        </Button>

                        <Container
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                marginRight: 0,
                            }}>
                            <Button variant="text" href="/quran">
                                <Typography
                                    variant="h6"
                                    textAlign="right"
                                    sx={{ color: "white" }}>
                                    quran
                                </Typography>
                            </Button>
                            {loggedIn && (
                                <div>
                                    <Button
                                        variant="text"
                                        onClick={handleClick}>
                                        <Typography
                                            variant="h6"
                                            textAlign="right"
                                            sx={{ color: "white" }}>
                                            account
                                        </Typography>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}>
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                navigate("/profile");
                                            }}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                logOut();
                                            }}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                            {!loggedIn && (
                                <div>
                                    <Button
                                        variant="text"
                                        onClick={handleClick}>
                                        <Typography
                                            variant="h6"
                                            textAlign="right"
                                            sx={{ color: "white" }}>
                                            account
                                        </Typography>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}>
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                navigate("/login");
                                            }}>
                                            Login
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                navigate("/signup");
                                            }}>
                                            Sign Up
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Container>
                        {/* <Menu
                            id="menu-appbar"
                            keepMounted
                            open={true}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}>
                            <MenuItem
                                key={"menu-1"}
                                onClick={navigate("/quran")}>
                             
                            </MenuItem>

                            {loggedIn && (
                                <MenuItem
                                    key={"menu-2"}
                                    onClick={navigate("/profile")}>
                                    <Typography textAlign="center">
                                        account
                                    </Typography>
                                </MenuItem>
                            )}

                            {!loggedIn && (
                                <MenuItem
                                    key={"menu-3"}
                                    onClick={navigate("/login")}>
                                    <Typography textAlign="center">
                                        account
                                    </Typography>
                                </MenuItem>
                            )} 
                            </Menu> */}
                    </Toolbar>
                    {/* </Box> */}
                </AppBar>
            </Box>
            <Outlet />
        </ThemeProvider>
    );
};

export default NavBar;
