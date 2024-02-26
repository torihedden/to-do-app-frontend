import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();

  const hrefWithoutTrailingSlash = window.location.href.replace(/\/+$/, "");

  return (
    <div>
      <button
        onClick={() =>
          logout({
            returnTo: `${hrefWithoutTrailingSlash}/login`,
          })
        }
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
