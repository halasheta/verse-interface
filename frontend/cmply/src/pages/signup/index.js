import React, { useState } from 'react';
import "./signup.css";
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    function validate_fields() {
        let currErrors = {};

        if (password === ''){
            currErrors["password"] = "Please enter a password.";
        }

        if (password2 === '' || password !== password2) {
            currErrors["password2"] = 'Passwords do not match.';
        }

        if (Object.entries(currErrors).length === 0) {
            return true;
        } else {
            setErrors(currErrors);
            return false;
        }

    }

    const submitReq = () => {
        if (validate_fields()) {
            fetch(`http://127.0.0.1:8000/accounts/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "password2": password2,
                })
            })
            .then(res => {
                if (!res.ok){
                    return Promise.reject(res);
                }
            
                // console.log(res.json())
                navigate('/login');
            })
            .catch(err => err.json())
            .then(res => {
                if ( res !== undefined && res.password !== undefined && Array.isArray(res.password)) {
                    let errs = res.password.slice();
                    errs["password"] = "Password is too weak.";
                    setErrors(errs);
                    }
                 else {
                    setErrors(res);
                }
            })
        }

    }
    return (
        <ThemeProvider theme={ theme }>
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form>
                <label>
                <TextField id="username" label="Username" variant="outlined" size="small" required 
                error={errors.username !== undefined} helperText={errors.username}
                onChange={e => setUsername(e.target.value)} />
                </label>

                <label>
                <TextField id="password" label="Password" type="password" size="small" variant="outlined" required 
                error={errors.password !== undefined} helperText={errors.password} 
                onChange={e => setPassword(e.target.value)} />
                </label>

                <label>
                <TextField id="password2" label="Confirm Password" size="small" type="password" variant="outlined" required
                error={errors.password2 !== undefined} helperText={errors.password2} 
                onChange={e => setPassword2(e.target.value)} />
                </label>

                <label>
                <Button className="Button" id="submit-button" size="small" variant="contained" onClick={submitReq}>Sign Up</Button>
                </label>

            </form>
            <Typography>
                Already have an account?
            </Typography>
            
            <Link to="/login" style={{color: 'primary'}}> 
                Login here!
            </Link>
        </div>
        </ThemeProvider>
    );


}

export default SignUp;