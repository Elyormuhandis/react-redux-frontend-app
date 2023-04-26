import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Authmiddleware = ({ children }) => {
  const { userToken } = useSelector((state) => state.user);

  if (!userToken) {
    return <Navigate to='/login' />;
  }

  return children;
};
export default Authmiddleware;
