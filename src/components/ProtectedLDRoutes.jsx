import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserAdmin, selectUserLanhDao } from "../features/user/userSlice";

const ProtectedLDRoute = () => {
  const lanhdao = useSelector(selectUserLanhDao);
  const location = useLocation();

  return lanhdao ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedLDRoute;
