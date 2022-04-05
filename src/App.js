import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import List from "./List/List";
import Loading from "./Loading/Loading";
import Login from "./Login/Login";
import useToken from "./useToken";

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.REACT_APP_URI;

function App() {
  const { setToken, deleteToken, token } = useToken();

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

  function handleEdit(currentTodo) {
    fetch(`${URI}/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }

  function handleAdd(todo) {
    fetch(`${URI}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
      }),
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }

  function handleDelete(id) {
    fetch(`${URI}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }

  function handleDeleteCompletedTodos() {
    fetch(`${URI}/todos/completed`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }

  const HomePage = () => {
    return (
      <>
        {!isLoaded && !error && <Loading />}

        {isLoaded && !error && todos !== [] && (
          <List
            todos={todos}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleDeleteCompletedTodos={handleDeleteCompletedTodos}
          />
        )}

        <div className="logout-wrapper">
          <button onClick={() => deleteToken()}>Logout</button>
        </div>

        {error && error}
      </>
    );
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/to-do-app-frontend/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
