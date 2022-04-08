import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Logout.css";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <div className="logout-wrapper">
      <button
        onClick={() =>
          logout({
            returnTo: `${window.location.href}/login`,
          })
        }
      >
        Log Out
      </button>
    </div>
  );
};

export default Logout;
