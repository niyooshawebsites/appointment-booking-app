import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedContent = () => {
  const { authenticated } = useSelector((state) => state.user_Slice);
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedContent;
