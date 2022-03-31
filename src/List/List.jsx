import { useState } from "react";
import Modal from "../Modal";
import Summary from "../Summary";
import TodoCreator from "../TodoCreator";
import "./List.css";

const List = (props) => {
  const { todos, handleEdit, handleAdd, handleDelete } = props;
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [isDeletingAllComplete, setIsDeletingAllComplete] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

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

      {isDeletingAllComplete && (
        <Modal
          prompt={`Delete ${
            todos.filter((todo) => todo.completed).length
          } completed ${
            todos.filter((todo) => todo.completed).length === 1
              ? "task"
              : "tasks"
          }?`}
          content={"This cannot be undone."}
          cancelAction={() => {
            setIsDeletingAllComplete(false);
          }}
          confirmAction={() => {
            setIsDeletingAllComplete(false);
          }}
          confirmText={`Delete ${
            todos.filter((todo) => todo.completed).length === 1
              ? "task"
              : "tasks"
          }`}
        />
      )}

      <Summary listLength={todos.filter((todo) => !todo.completed).length} />

      <TodoCreator
        handleAdd={handleAdd}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
      />

      {/* Incompleted tasks */}
      <div className="uncompleted-todos">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
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
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
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

      <div className="delete-all-wrapper">
        <button
          className={"negative delete-all-button"}
          title="Delete all completed tasks"
          onClick={() => {
            setIsDeletingAllComplete(true);
          }}
        >
          Delete all completed tasks
        </button>
      </div>
    </>
  );
};

export default List;
