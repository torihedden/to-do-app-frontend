import "./TodoCreator.css";

const TodoCreator = (props) => {
  const { handleAdd, newTodoTitle, setNewTodoTitle } = props;

  return (
    <div className="new-task-wrapper">
      {/* TODO: convert text input and button to proper form */}
      {/* <form onSubmit={handleAdd}> */}
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
        className="positive add-todo"
        // type="submit"
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
      {/* </form> */}
    </div>
  );
};

export default TodoCreator;
