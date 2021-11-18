import { useEffect, useState } from "react";

import "./App.css";
import List from "./List.jsx";

function App() {
  useEffect(() => {
    let mounted = true;

    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setIsLoaded(true);
          setTodos(res);
          // setTodos(res.slice(0, 10));
        }
      })
      .catch((error) => {
        console.log("error", error);
        setError("There was a problem retrieving your to-do list.");
      });
  }, []);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleEdit = (currentTodo) => {
    fetch("http://localhost:5000", {
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
    fetch("http://localhost:5000", {
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
    fetch("http://localhost:5000/", {
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
      {!isLoaded && !error && <img src="logo192.png" alt="" width="100" />}
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
