import { useEffect, useState } from "react";

import "./App.css";
import List from "./List.jsx";

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.REACT_APP_URI;

function App() {
  useEffect(() => {
    let mounted = true;

    fetch(URI)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setIsLoaded(true);
          setTodos(res);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError("There was a problem retrieving your to-do list.");
      });
  }, []);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleEdit = (currentTodo) => {
    fetch(URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(currentTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  };

  function handleAdd(todo) {
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
    fetch(URI, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }

  return (
    <div className="app">
      {!isLoaded && !error && <div>Loading...</div>}
      {isLoaded && !error && todos !== [] && (
        <List
          todos={todos}
          handleEdit={handleEdit}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      )}

      {error && error}
    </div>
  );
}

export default App;
