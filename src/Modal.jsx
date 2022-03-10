import "./Modal.css";

const Modal = (props) => {
  const { currentTodo, setisDeleting, setCurrentTodo, handleDelete } = props;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-prompt">Delete "{currentTodo.title}" task?</div>
        <div className="modal-warning">This cannot be undone.</div>
        <div className="button-wrapper">
          <button
            onClick={() => {
              setisDeleting(false);
              setCurrentTodo({});
            }}
          >
            Cancel
          </button>
          <button
            className="negative"
            onClick={() => {
              setisDeleting(false);
              handleDelete(currentTodo._id);
              setCurrentTodo({});
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
