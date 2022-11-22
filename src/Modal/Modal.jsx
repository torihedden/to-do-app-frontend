import "./Modal.css";

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
    <div className="modal">
      <div className="modal-content">
        <div className="modal-prompt">{prompt}</div>

        {/* for deletion modal */}
        {!isEditable && <div className="modal-text">{content}</div>}

        <form>
          {/* for editing modal */}
          {isEditable && (
            <input
              className="edit-task"
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

          <div className="button-wrapper">
            <button
              onClick={cancelAction}
              autoFocus={!isEditable ? true : false}
            >
              Cancel
            </button>
            <button className="negative" onClick={confirmAction}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
