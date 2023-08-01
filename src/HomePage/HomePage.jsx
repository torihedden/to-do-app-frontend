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
  if (a.priority < b.priority) return -1;

  if (a.priority > b.priority) return 1;

  return 0;
}

function reorderTodoPriorities(todos) {
  todos.sort(sortByPriority);

  todos.map((t) => {
    return (t.priority = todos.indexOf(t) + 1);
  });

  console.log(todos);
  return todos;
}

const HomePage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([]);

  const sortedTodos = (todos) => todos.sort(sortByPriority);

  useEffect(() => {
    let mounted = true;

    fetch(`${URI}/todos`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setIsLoaded(true);
          setTodos(sortedTodos(res));
        }
      })
      // add error messaging to other request types
      .catch((error) => {
        console.log("Error: ", error);
        setError("There was a problem retrieving your list.");
      });
  }, []);

  function handleEdit(currentTodo) {
    fetch(`${URI}/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodos(sortedTodos(res)));
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
        priority: todo.priority,
      }),
    })
      .then((res) => res.json())
      .then((res) => setTodos(sortedTodos(res)));
  }

  function handleDelete(id) {
    fetch(`${URI}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTodos(sortedTodos(res)));
    // need to re-assign priorities of all tasks after successful deletion
  }

  function handleDeleteCompletedTodos() {
    fetch(`${URI}/todos/completed`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTodos(sortedTodos(res)));
    // don't re-assign priorities of any uncompleted tasks yet, because this todo can be moved back to the "uncompleted" section
  }

  function handleReorderTodos() {
    fetch(`${URI}/todos/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // body: {reorderTodoPriorities(todos)},
      // body: JSON.stringify(todos),
    })
      .then((res) => res.json())
      .then((res) => setTodos(sortedTodos(res))); // this additional re-sort is probably superfluous but putting it here mirrors its presence in the rest of the similar functions
  }

  // function handleDeleteAllTodos() {
  //   fetch(`${URI}/todos/all`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => setTodos(res));
  // }

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
          // handleDeleteAllTodos={handleDeleteAllTodos}
        />
      )}
      <ErrorMessage error={error} />
      <br />
      <button type="button" onClick={() => handleReorderTodos()}>
        Force re-order
      </button>
      <Logout />
    </>
  );
};

export default withAuthenticationRequired(HomePage);
