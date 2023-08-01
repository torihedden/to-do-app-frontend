import { useState } from "react";
import Modal from "../Modal/Modal";
import Summary from "../Summary/Summary";
import TodoCreator from "../TodoCreator/TodoCreator";
import "./List.css";
import imgSrc from "../assets/nuclear-explosion.svg";

const List = (props) => {
  const {
    todos,
    handleEdit,
    handleAdd,
    handleDelete,
    handleDeleteCompletedTodos,
    // handleDeleteAllTodos,
  } = props;
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [isDeletingAllCompleted, setIsDeletingAllCompleted] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);

  return (
    <>
      {isEditing && (
        <Modal
          currentTodo={currentTodo}
          setCurrentTodo={setCurrentTodo}
          isEditable={true}
          prompt={"Edit task"}
          content={currentTodo.title}
          cancelAction={() => {
            setIsEditing(false);
            setCurrentTodo({});
          }}
          confirmAction={() => {
            handleEdit({
              ...currentTodo,
              title: currentTodo.title.trim(),
            });
            setIsEditing(false);
            setCurrentTodo({});
          }}
          confirmText={"Save"}
        />
      )}

      {isDeleting && (
        <Modal
          prompt={`Delete "${currentTodo.title}" task?`}
          content={"This cannot be undone."}
          cancelAction={() => {
            setisDeleting(false);
            setCurrentTodo({});
          }}
          confirmAction={() => {
            setisDeleting(false);
            handleDelete(currentTodo._id);
            setCurrentTodo({});
          }}
          confirmText={"Delete"}
        />
      )}

      {isDeletingAllCompleted && (
        <Modal
          prompt={`Delete ${completeTodos.length} completed ${
            completeTodos.length === 1 ? "task" : "tasks"
          }?`}
          content={"This cannot be undone."}
          cancelAction={() => {
            setIsDeletingAllCompleted(false);
          }}
          confirmAction={() => {
            handleDeleteCompletedTodos();
            setIsDeletingAllCompleted(false);
          }}
          confirmText={`Delete ${
            completeTodos.length === 1 ? "task" : "tasks"
          }`}
        />
      )}

      {isDeletingAll && (
        <Modal
          prompt="Delete ALL tasks and start over?"
          content={"WARNING! This cannot be undone."}
          confirmText="Delete everything"
        />
      )}

      <Summary
        completeListLength={completeTodos.length}
        incompleteListLength={incompleteTodos.length}
      />

      <TodoCreator
        handleAdd={handleAdd}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        todoListLength={todos.length}
      />

      {/* Incompleted tasks */}
      <div className="uncompleted-todos">
        {incompleteTodos.map((todo) => (
          <div key={todo._id} className="todo-wrapper">
            <label
              htmlFor={todo.title}
              className={todo.completed ? "completed-task" : ""}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  handleEdit({ ...todo, completed: !todo.completed });
                  if (isEditing) {
                    setIsEditing(false);
                  }
                }}
                id={todo.title}
                name={todo.title}
                value={todo.title}
              />
              <span className="checkmark">{todo.completed}</span>
              <span className="title">{todo.title}</span>
            </label>

            <div className="editing-wrapper">
              <button
                type="button"
                title="Edit task"
                disabled={todo.completed}
                onClick={() => {
                  setCurrentTodo(todo);
                  setIsEditing(true);
                }}
              >
                Edit
              </button>

              <button
                type="button"
                title="Delete task"
                className={"positive delete-button"}
                onClick={() => {
                  setCurrentTodo(todo);
                  setisDeleting(currentTodo);
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed tasks */}
      <div className="completed-todos">
        {completeTodos.map((todo) => (
          <div key={todo._id} className="todo-wrapper">
            <label
              htmlFor={todo.title}
              className={todo.completed ? "completed-task" : ""}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  handleEdit({ ...todo, completed: !todo.completed });
                  if (isEditing) {
                    setIsEditing(false);
                  }
                }}
                id={todo.title}
                name={todo.title}
                value={todo.title}
              />
              <span className="checkmark">{todo.completed}</span>
              {!(isEditing && currentTodo._id === todo._id) && (
                <span className="title">{todo.title}</span>
              )}
            </label>
            <button
              type="button"
              title="Delete task"
              className={"positive delete-button"}
              onClick={() => {
                setCurrentTodo(todo);
                setisDeleting(currentTodo);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="delete-wrapper">
        <button
          type="button"
          className={"negative delete-all-completed-button"}
          title="Delete all completed tasks"
          disabled={completeTodos.length < 1}
          onClick={() => {
            setIsDeletingAllCompleted(true);
          }}
        >
          Delete all completed tasks
        </button>
        <button
          type="button"
          title="Delete all tasks"
          onClick={() => setIsDeletingAll(true)}
        >
          <img style={{ display: "flex" }} width={"30px"} src={imgSrc} alt="" />
        </button>
      </div>
    </>
  );
};

export default List;
