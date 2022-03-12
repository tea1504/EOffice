import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectLoginToken } from "../features/login/loginSlice";

const ProtectedRoutes = () => {
  const token = useSelector(selectLoginToken);
  const location = useLocation();

  return token === null ? (
    <Navigate to="/login" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
