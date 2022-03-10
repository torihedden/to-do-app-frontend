import { useState } from "react";
import Modal from "./Modal";
import Summary from "./Summary";
import TodoCreator from "./TodoCreator";

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

      <TodoCreator handleAdd={handleAdd} setNewTodoTitle={setNewTodoTitle} />

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

              <div
                className={
                  isEditing && todo._id === currentTodo._id
                    ? "editing-wrapper editing"
                    : "editing-wrapper"
                }
              >
                {isEditing && todo._id === currentTodo._id && (
                  <>
                    <input
                      type="text"
                      onChange={(event) => {
                        setCurrentTodo({ ...todo, title: event.target.value });
                      }}
                      id={todo._id}
                      name={todo.title}
                      value={
                        currentTodo !== {} ? currentTodo.title : todo.title
                      }
                      readOnly={todo.completed}
                    />

                    <div className="editing-buttons-wrapper">
                      <button
                        className="positive"
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

                      <button
                        onClick={() => {
                          setCurrentTodo({});
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {!isEditing && (
                  <button
                    disabled={todo.completed}
                    onClick={() => {
                      setCurrentTodo(todo);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <button
                title="Delete task"
                className="negative"
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

      {/* Completed tasks */}
      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
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
            <div className="editing-wrapper">
              <button
                title="Delete task"
                className="negative"
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
    </>
  );
};

export default List;
