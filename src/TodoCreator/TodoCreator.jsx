const TodoCreator = (props) => {
  const { handleAdd, newTodoTitle, setNewTodoTitle } = props;

  return (
    <form>
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
