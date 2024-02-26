import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import NotFound from "./NotFound/NotFound";

import "dotenv/config"

function App() {
  // TODO: handle with React Helmet
  document.title = process.env.REACT_APP_TITLE
  // document.querySelector("link[rel~='icon']").href = process.env.REACT_APP_FAVICON

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/to-do-app-frontend/" element={<HomePage />} />
          <Route path="/to-do-app-frontend/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
