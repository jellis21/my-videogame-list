import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // get a piece of state
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("/api/v1/users/login", { username, password }) // axios retursn the "data" key we're accessing
      .then(res => {
        window.localStorage.setItem('token', res.data.token)
        navigate("/lists");
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* <p>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </p> */}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
