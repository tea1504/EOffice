import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserAdmin } from "../features/user/userSlice";

const ProtectedAdminRoute = () => {
  const admin = useSelector(selectUserAdmin);
  const location = useLocation();

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedAdminRoute;
