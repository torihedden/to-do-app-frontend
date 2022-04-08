import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
    <div className="app">
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
