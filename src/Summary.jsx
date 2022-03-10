import "./Summary.css";

const greeting = () => {
  let time = new Date().getHours();

  if (time < 12) {
    return "Good morning!";
  } else if (time > 12 && time < 17) {
    return "Good afternoon!";
  } else return "Good evening!";
};

const Summary = (props) => {
  const { listLength } = props;
  return (
    <>
      {listLength === 0 ? (
        <div className="summary">
          Congratulations! You are done with your list.
        </div>
      ) : (
        <div className="summary">
          {greeting()} You have {listLength} items left on your list.
        </div>
      )}
    </>
  );
};

export default Summary;
