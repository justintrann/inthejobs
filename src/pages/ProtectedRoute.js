import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.userSlice);

  if (!user) {
    // console.log(props);
    return <Navigate to="/" />;
  }
  return props.children;
};

export default ProtectedRoute;
