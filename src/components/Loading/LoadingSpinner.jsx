import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="bg-deepBlack min-h-screen flex justify-center items-center">
      <HashLoader size={60} color="#0077b6" />
    </div>
  );
};

export default LoadingSpinner;
