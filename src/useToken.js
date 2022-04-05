// THIS IS FAKE AND BAD. PLEASE DON'T RELY ON THIS FOR ACTUAL PRODUCTION AUTHENTICATION.

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

  const deleteToken = (token) => {
    localStorage.removeItem(TOKEN_NAME);
    setToken();
  };

  return {
    setToken: saveToken,
    deleteToken,
    token,
  };
}
