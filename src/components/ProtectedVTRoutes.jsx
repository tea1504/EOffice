import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserAdmin, selectUserLanhDao, selectUserVanThu } from "../features/user/userSlice";

const ProtectedVTRoute = () => {
  const vanthu = useSelector(selectUserVanThu);
  const location = useLocation();

  return vanthu ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedVTRoute;
