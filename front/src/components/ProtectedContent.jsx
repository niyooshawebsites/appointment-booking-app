import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedContent = () => {
  const { username } = useSelector((state) => state.service_Provider_Slice);

  const { authenticated } = useSelector((state) => state.user_Slice);
  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={username !== "abs" ? `/${username}/login` : "/login"} />
  );
};

export default ProtectedContent;
