import React, { useState, useEffect } from 'react';
import './nav.css';
import { Outlet, useNavigate, Link } from "react-router-dom";
import { NavDropdown, Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { tokenHandle } from '../login';
import { ThemeProvider} from "@mui/material/styles";
import { theme } from "../../theme";


const Layout = () => {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const logOut = () => {
        sessionStorage.setItem("access", null);
        sessionStorage.setItem("refresh", null);
    }

    useEffect(() => {
        tokenHandle().then(valid => {
            if (!valid) {
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        })
    }

    )

    return (
        <ThemeProvider theme={theme}>
            <div className='nav-element'>
            <Navbar variant="dark" position="sticky"
            style={{backgroundColor: "#d97a1e"}}>
                    <NavbarBrand href="/">compassionately</NavbarBrand>
                    <Nav className="ml-auto">
                        <LinkContainer to="/quran"><NavLink>quran</NavLink></LinkContainer>

                        {loggedIn &&
                            <NavDropdown title="account" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile" className="dropdown-item">profile</NavDropdown.Item>

                        
                        </NavDropdown>}

                        {!loggedIn &&
                            <NavDropdown title="account" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login" className="dropdown-item">log in</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/signup" className="dropdown-item">sign up</NavDropdown.Item>

                        
                        </NavDropdown>}

                        {loggedIn &&
                        <LinkContainer onClick={logOut} to="/">
                            <NavLink>log out</NavLink>
                        </LinkContainer>}

                    </Nav>
                </Navbar>
                <Outlet/>
                </div>
            </ThemeProvider>
    );
}
export default Layout;