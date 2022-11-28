import LoadingDots from "../LoadingDots/LoadingDots";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div>Loading</div>
      <LoadingDots />
    </div>
  );
};

export default Loading;
