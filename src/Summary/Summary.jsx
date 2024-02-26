const Summary = (props) => {
  const { completeListLength, incompleteListLength } = props;
  return (
    <>
      {completeListLength !== 0 && incompleteListLength === 0 ? (
        <div>
          <div>Congratulations!</div>
          You are done with your list.
        </div>
      ) : (
        <div>
          <div>
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
