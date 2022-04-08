import React from "react";
import List from "../List/List";
import Loading from "../Loading/Loading";
import Logout from "../Logout/Logout";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const HomePage = (props) => {
  const { todos, setTodos, isLoaded, error, URI } = props;

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

      {error && error}

      <Logout />
    </>
  );
};

export default withAuthenticationRequired(HomePage);
