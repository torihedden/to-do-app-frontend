import "./Summary.css";

const Summary = (props) => {
  const { completeListLength, incompleteListLength } = props;
  return (
    <>
      {completeListLength !== 0 && incompleteListLength === 0 ? (
        <div className="summary">
          <div className="summary-greeting">Congratulations!</div>
          You are done with your list.
        </div>
      ) : (
        <div className="summary">
          <div className="summary-item-details">
            {completeListLength === 0 &&
              incompleteListLength === 0 &&
              "You haven't added any tasks yet."}

            {incompleteListLength >= 1 &&
              `You have ${incompleteListLength} ${incompleteListLength > 1 ? "items" : "item"
              } left on your list.`}
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
