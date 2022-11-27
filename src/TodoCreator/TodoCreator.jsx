import "./TodoCreator.css";

const TodoCreator = (props) => {
  const { handleAdd, newTodoTitle, setNewTodoTitle } = props;

  return (
    <form className="new-task-wrapper">
      <label htmlFor="new-todo">
        <input
          type="text"
          name="todo"
          placeholder="New task"
          id="new-todo"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </label>
      <button
        className="positive add-todo"
        type="submit"
        onClick={() => {
          if (newTodoTitle !== "") {
            handleAdd({ title: newTodoTitle.trim() });
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
