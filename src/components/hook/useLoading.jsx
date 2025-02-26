import { useContext } from "react";
import LoadingContext from "../context/LoadingContext";

const useLoading = () => {
  const loading = useContext(LoadingContext);
  return loading;
};

export default useLoading;
