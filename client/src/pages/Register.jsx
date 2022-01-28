import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // get a piece of state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/users/register", { email, username, password })
      .then((res) => {
        alert("Registered Successfully");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div>
      <div className="home__header">
        <div className="home__header--line"> </div>
        <h1 className="display-3 text-center mt-5 mb-3">Sign Up</h1>
      <p className="text-center">
        Join MyVideoGameList to catalog your video games, compare with other
        users, create your own profile, and plenty more.
      </p>
      </div>
      <div className="register-form d-flex flex-column align-items-center">
      <h1>Sign up with email:</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </p>
        <button className="btn btn-secondary" type="submit">Register</button>
        <img src="../charizard.gif" alt="charizard blasting the register button" style={{height: "57px", width: "125px"}} />
      </form>
      </div>
    </div>
  );
};

export default Register;
