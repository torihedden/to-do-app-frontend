import "./TodoCreator.css";

const TodoCreator = ({
  handleAdd,
  newTodoTitle,
  setNewTodoTitle,
  todoListLength,
}) => {
  return (
    <form className="new-task-wrapper">
      <label htmlFor="new-todo">New task</label>
      <input
        type="text"
        name="todo"
        placeholder="New task"
        id="new-todo"
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
      />
      <button
        className="positive add-todo"
        type="submit"
        onClick={() => {
          if (newTodoTitle !== "") {
            handleAdd({
              title: newTodoTitle.trim(),
              priority: todoListLength + 1,
            });
            setNewTodoTitle("");
          }
        }}
        disabled={newTodoTitle === ""}
      >
        Add
      </button>
    </form>
  );
};

export default TodoCreator;
