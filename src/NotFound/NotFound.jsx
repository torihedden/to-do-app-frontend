import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>404: Page not found.</h1>
      <div>Looks like that page doesn't exist.</div>
      <div>
        Try <a href="/to-do-app-frontend">going home</a> instead.
      </div>
    </div>
  );
};

export default NotFound;
