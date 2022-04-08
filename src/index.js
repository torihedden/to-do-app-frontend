import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-cfelw9db.us.auth0.com"
    clientId="DVg2JXKdD0cr9JZ9dTwRkRwXJ11ki9Z3"
    redirectUri={`${window.location.origin}/to-do-app-frontend`}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

reportWebVitals();
