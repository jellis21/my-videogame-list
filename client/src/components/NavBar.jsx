import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function NavBar() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return <nav>

<Navbar bg="warning" variant="light" expand="md">
  <Container>
    <Navbar.Brand href="#home">My Videogame List</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link className='nav-margin' to="/">Home</Link>
          { isLoggedIn ? (
            <>
            <Link className='nav-margin' to="/lists">My List</Link>
            <button className="nav-button link-primary" href="#" onClick={() => handleLogout()}>Log Out</button>
            </>
          ) : (
            <>
            <Link className='nav-margin' to="/register">Register</Link>
            <Link className='nav-margin' to="/login">Login</Link>
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
