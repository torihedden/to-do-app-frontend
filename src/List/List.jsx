import { useState } from "react";
import Modal from "../Modal/Modal";
import Summary from "../Summary/Summary";
import TodoCreator from "../TodoCreator/TodoCreator";

const List = (props) => {
  const {
    todos,
    handleEdit,
    handleAdd,
    handleDelete,
    handleDeleteCompletedTodos,
  } = props;
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [isDeletingAllCompleted, setIsDeletingAllCompleted] = useState(false);
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
          prompt={`Delete ${completeTodos.length} completed ${completeTodos.length === 1 ? "task" : "tasks"
            }?`}
          content={"This cannot be undone."}
          cancelAction={() => {
            setIsDeletingAllCompleted(false);
          }}
          confirmAction={() => {
            handleDeleteCompletedTodos();
            setIsDeletingAllCompleted(false);
          }}
          confirmText={`Delete ${completeTodos.length === 1 ? "task" : "tasks"
            }`}
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
      />

      {/* Incompleted tasks */}
      <div>
        {incompleteTodos.map((todo) => (
          <div key={todo._id}>
            <label
              htmlFor={todo.title}
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
              <span>{todo.completed}</span>
              <span>{todo.title}</span>
            </label>

            <div>
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
      <div>
        {completeTodos.map((todo) => (
          <div key={todo._id}>
            <label
              htmlFor={todo.title}
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
              <span>{todo.completed}</span>
              {!(isEditing && currentTodo._id === todo._id) && (
                <span>{todo.title}</span>
              )}
            </label>
            <button
              title="Delete task"
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

      <div>
        <button
          title="Delete all completed tasks"
          disabled={completeTodos.length < 1}
          onClick={() => {
            setIsDeletingAllCompleted(true);
          }}
        >
          Delete all completed tasks
        </button>
      </div>
    </>
  );
};

export default List;
