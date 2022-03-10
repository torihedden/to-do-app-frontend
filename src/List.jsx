import { useState } from "react";
import Modal from "./Modal";
import Summary from "./Summary";
import TodoCreator from "./TodoCreator";
import "./List.css";

const List = (props) => {
  const { todos, handleEdit, handleAdd, handleDelete } = props;
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  return (
    <>
      {isDeleting && (
        <Modal
          currentTodo={currentTodo}
          setisDeleting={setisDeleting}
          setCurrentTodo={setCurrentTodo}
          handleDelete={handleDelete}
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
                {!(isEditing && currentTodo._id === todo._id) && (
                  <span className="title">{todo.title}</span>
                )}
              </label>

              {isEditing && todo._id === currentTodo._id && (
                <>
                  <input
                    type="text"
                    onChange={(event) => {
                      setCurrentTodo({ ...todo, title: event.target.value });
                    }}
                    id={todo._id}
                    name={todo.title}
                    value={currentTodo !== {} ? currentTodo.title : todo.title}
                    readOnly={todo.completed}
                  />

                  <div className="editing-wrapper">
                    <button
                      onClick={() => {
                        setCurrentTodo({});
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      title="Save"
                      className="positive"
                      disabled={currentTodo.title === ""}
                      onClick={() => {
                        handleEdit({
                          ...currentTodo,
                          title: currentTodo.title.trim(),
                        });
                        setIsEditing(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              {!isEditing && (
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
              )}
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
                className="positive"
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
        >
          Delete all completed tasks
        </button>
      </div>
    </>
  );
};

export default List;
