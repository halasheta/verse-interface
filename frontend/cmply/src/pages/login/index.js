import React, { useContext, useState } from 'react';
import "./login.css";
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import UserAPIContext from '../../contexts/UserAPIContext';

const Login = () => {
    const [username1, setUsername1] = useState("");
    const [password, setPassword] = useState("");

    const { setUsername, setUserId, setUserLikes, setUserPosts } = useContext(UserAPIContext);

    const [valid, setValid] = useState(true);

    let navigate = useNavigate();

    async function submitReq(){
        await fetch("http://localhost:8000/accounts/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username1,
                "password": password
            })
        }).then(res => {
            // try to login
            if (!res.ok) {
                setValid(false);
                return Promise.reject(res)
            }
            return res.json()
        }).then(data => {
            // if valid, try to retrieve token
            if (data.access === undefined) {
                setValid(false);
            } else {
                sessionStorage.setItem("access", data.access);
                sessionStorage.setItem("refresh", data.refresh);
            }

        }).catch(err => console.log(err));

        fetch("http://localhost:8000/accounts/profile/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            setUsername(data.username);
            setUserId(data.id);
            setUserPosts(data.posts);
            setUserLikes(data.likes);
            navigate('/');
        })
        .catch(err => console.log(err))

    }

    return (
        <ThemeProvider theme={ theme }>
            <div className="login-page">
                <h2>Login</h2>
                <form>
                    
                    <label>
                    <TextField id="username" label="Username" variant="outlined" size="small" required onChange={e => setUsername1(e.target.value)} />
                    </label>

                    <label>
                    <TextField id="password" label="Password" type="password" size="small" variant="outlined" required onChange={e => setPassword(e.target.value)} />
                    </label>

                    <label>
                    <Button className="Button" id="login-button" variant="contained" onClick={submitReq} >Login</Button>
                    </label>

                </form>

                Don't have an account?
                <br/>
                <Link to="/signup" color='primary'> 
                    Sign up here!
                </Link>
            </div>
        </ThemeProvider>

    );

}

export default Login;

export async function tokenHandle() {
    return await fetch("http://localhost:8000/accounts/token/refresh/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "refresh": sessionStorage.getItem("refresh"),
        })
    }).then(res => {
        if (!res.ok) {
            // refresh token was invalid
            return Promise.reject(res);
        }
        return res.json();
    }).then(data => {
        sessionStorage.setItem("access", data.access);
        return true;
    }).catch(res => {
        console.log(res.status, res.statusText);
        return false;
    })
}