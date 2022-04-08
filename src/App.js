import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.REACT_APP_URI;

function App() {
  useEffect(() => {
    let mounted = true;

    fetch(`${URI}/todos`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setIsLoaded(true);
          setTodos(res);
        }
      })
      // TODO: add error messaging to other request types
      .catch((error) => {
        console.log("Error: ", error);
        setError("There was a problem retrieving your to-do list.");
      });
  }, []);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/to-do-app-frontend/"
            element={
              <HomePage
                todos={todos}
                setTodos={setTodos}
                isLoaded={isLoaded}
                error={error}
                URI={URI}
              />
            }
          />
          <Route path="/to-do-app-frontend/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
