import { useState } from "react";

const TOKEN_NAME = "tiny-todo-token";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(TOKEN_NAME);
    const token = JSON.parse(tokenString);
    return token?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
    setToken(token.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
