import { useState } from "react";

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.REACT_APP_URI;

const Login = (props) => {
  const { setToken } = props;
  const [password, setPassword] = useState();

  const loginUser = async (credentials) => {
    return fetch(`${URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      password,
    });
    setToken(token);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button title="Log in" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
