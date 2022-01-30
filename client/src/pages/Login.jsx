import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // get a piece of state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/users/login", { username, password }) // axios returns the "data" key we're accessing
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("username", username);
        navigate("/lists");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div>
      <div className="home__header">
        <div className="home__header--line"> </div>
        <h1 className="display-3 text-center mt-5 mb-3">Login</h1>
      </div>
      <div className="login-form__wrapper">
      <div className="login-form d-flex flex-column align-items-center">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button className="btn btn-secondary" type="submit">
          Login
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
