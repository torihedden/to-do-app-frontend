import { useEffect, useState, React } from "react";
import List from "../List/List";
import Loading from "../Loading/Loading";
import Logout from "../Logout/Logout";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.REACT_APP_URI;

function sortByPriority(a, b) {
  if (a.priority < b.priority) {
    return -1;
  }

  if (a.priority > b.priority) {
    return 1;
  }

  return 0;
}

const HomePage = () => {
  useEffect(() => {
    let mounted = true;

    fetch(`${URI}/todos`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setIsLoaded(true);
          setTodos(res.sort(sortByPriority));
          console.log(res);
        }
      })
      // TODO: add error messaging to other request types
      .catch((error) => {
        console.log("Error: ", error);
        setError("There was a problem retrieving your list.");
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
      <ErrorMessage error={error} />
      <Logout />
    </>
  );
};

export default withAuthenticationRequired(HomePage);
