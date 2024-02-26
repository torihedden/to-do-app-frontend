const Modal = (props) => {
  const {
    currentTodo,
    setCurrentTodo,
    prompt,
    content,
    isEditable,
    cancelAction,
    confirmAction,
    confirmText,
  } = props;

  return (
    <div>
      <div>
        <div>{prompt}</div>

        {/* for deletion modal */}
        {!isEditable && <div>{content}</div>}

        <form>
          {/* for editing modal */}
          {isEditable && (
            <input
              type="text"
              onChange={(event) => {
                setCurrentTodo({ ...currentTodo, title: event.target.value });
              }}
              id={currentTodo._id}
              name={currentTodo.title}
              value={content}
              autoFocus={isEditable ? true : false}
            />
          )}

          <div>
            <button
              onClick={cancelAction}
              autoFocus={!isEditable ? true : false}
            >
              Cancel
            </button>
            <button onClick={confirmAction}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
