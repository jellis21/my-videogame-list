import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
// import axios from 'axios';

function NavBar() {
  const [user, setUser] = useState('');

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isLoggedIn = token ? true : false;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate("/")
    // window.location.reload();
  }

  // generate welcome message
  useEffect(() => {
    setUser(username)
  }, [username])

  return <nav>

<Navbar fixed="top" variant="dark" expand="md">
  <Container>
    <Navbar.Brand href="#home">My Videogame List</Navbar.Brand>
    { isLoggedIn ? <Navbar.Text> Hi, {user} </Navbar.Text> : <Navbar.Text></Navbar.Text>}
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link className='nav-margin nav-color ms-md-3' to="/">Home</Link>
          { isLoggedIn ? (
            <>
            <Link className='nav-margin nav-color' to="/lists">My List</Link>
            <Link className='nav-margin nav-color' to="/social">Social</Link>
            <button className="nav-button nav-color" href="#" onClick={() => handleLogout()}>Log Out</button>
            </>
          ) : (
            <>
            <Link className='nav-margin nav-color' to="/register">Register</Link>
            <Link className='nav-margin nav-color' to="/login">Login</Link>
            </>
          )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          { isLoggedIn ? (
            <>
            <li><Link to="/lists">My List</Link></li>
            <li><button href="#" onClick={() => handleLogout()}>Log Out</button></li>
            </>
          ) : (
            <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav> */}


  </nav>;
}

export default NavBar;
