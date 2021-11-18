import { useState } from "react";

const List = (props) => {
  const { todos, handleEdit, handleAdd, handleDelete } = props;
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  return (
    <>
      <div>todo list ({todos.length} items)</div>
      {todos.map((todo) => (
        <div key={todo._id} className={"todo-wrapper"}>
          <label
            htmlFor={todo.title}
            className={todo.completed ? "completed-task" : ""}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                handleEdit({ ...todo, completed: !todo.completed });
              }}
              id={todo.title}
              name={todo.title}
              value={todo.title}
            />
            <span className="checkmark">{todo.completed}</span>
            <span className="title">{todo.title}</span>
          </label>

          <div>
            {isEditing && todo._id === currentTodo.id && (
              <input
                onChange={(event) => {
                  setCurrentTodo({ ...todo, title: event.target.value });
                  console.log(currentTodo);
                }}
                id={todo._id}
                name={todo.title}
                value={currentTodo !== {} ? currentTodo.title : todo.title}
                readOnly={todo.completed}
              />
            )}
            {isEditing && todo._id === currentTodo.id && (
              <button
                className={"positive"}
                onClick={() => {
                  console.log(currentTodo);
                  handleEdit({
                    ...currentTodo,
                    title: currentTodo.title.trim(),
                  });
                }}
              >
                Submit change
              </button>
            )}
            <button
              disabled={todo.completed}
              onClick={() => {
                if (!isEditing) {
                  setCurrentTodo(todo);
                  setIsEditing(true);
                  console.log(currentTodo);
                } else {
                  setCurrentTodo({});
                  setIsEditing(false);
                }
              }}
            >
              {isEditing && todo._id === currentTodo.id
                ? "Close editor"
                : "Edit task"}
            </button>
            <button
              className={"negative"}
              onClick={() => handleDelete(todo._id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
      <label htmlFor="new-todo">
        <input
          type="text"
          name="todo"
          placeholder="Describe your task here"
          id={"new-todo"}
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </label>
      <button
        className={"positive"}
        onClick={() => {
          if (newTodoTitle !== "") {
            handleAdd({ title: newTodoTitle.trim() });
            setNewTodoTitle("");
          }
        }}
        disabled={newTodoTitle === ""}
      >
        Add new task
      </button>
    </>
  );
};

export default List;
