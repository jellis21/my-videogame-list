import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function NavBar() {
  const [user, setUser] = useState('');
  const [expanded, setExpanded] = useState(false);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isLoggedIn = token ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate("/")
    setExpanded(false)
  }

  // generate welcome message
  useEffect(() => {
    setUser(username)
  }, [username])

  return <nav>

<Navbar expanded={expanded} fixed="top" variant="dark" expand="md">
  <Container>
    <Navbar.Brand href="#home">MyVideoGameList</Navbar.Brand>
    { isLoggedIn ? <Navbar.Text> Hi, {user} </Navbar.Text> : <Navbar.Text></Navbar.Text>}
    
    <Navbar.Toggle 
      onClick={() => setExpanded(expanded ? false : "expanded")}
      aria-controls="basic-navbar-nav" /> 
    <Navbar.Collapse id="basic-navbar-nav"> 
      <Nav className="me-auto">
      <Link onClick={() => setExpanded(false)} className='nav-margin nav-color ms-md-3' to="/">Home</Link>
          { isLoggedIn ? (
            <>
            <Link onClick={() => setExpanded(false)} className='nav-margin nav-color' to="/lists">My List</Link>
            <Link onClick={() => setExpanded(false)} className='nav-margin nav-color' to="/social">Social</Link>
            <button className="nav-button nav-color" href="#" onClick={() => handleLogout()}>Log Out</button>
            </>
          ) : (
            <>
            <Link onClick={() => setExpanded(false)} className='nav-margin nav-color' to="/register">Register</Link>
            <Link onClick={() => setExpanded(false)} className='nav-margin nav-color' to="/login">Login</Link>
            </>
          )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  </nav>;
}

export default NavBar;
