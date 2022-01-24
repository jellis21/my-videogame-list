import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return <div>
    <nav>
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
      </nav>
  </div>;
}

export default NavBar;
