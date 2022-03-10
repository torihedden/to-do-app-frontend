const TodoCreator = (props) => {
  const { handleAdd, newTodoTitle, setNewTodoTitle } = props;
  return (
    <div className="new-task-wrapper">
      <label htmlFor="new-todo">
        <input
          type="text"
          name="todo"
          placeholder="Describe your task"
          id="new-todo"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </label>
      <button
        className="positive"
        onClick={() => {
          if (newTodoTitle !== "") {
            handleAdd({ title: newTodoTitle.trim() });
            setNewTodoTitle("");
          }
        }}
        disabled={newTodoTitle === ""}
      >
        + Add
      </button>
    </div>
  );
};

export default TodoCreator;
