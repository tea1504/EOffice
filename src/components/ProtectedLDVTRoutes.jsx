import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserAdmin, selectUserLanhDao, selectUserVanThu } from "../features/user/userSlice";

const ProtectedLDVTRoute = () => {
  const vanthu = useSelector(selectUserVanThu);
  const lanhdao = useSelector(selectUserLanhDao);
  const location = useLocation();

  return (vanthu || lanhdao) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedLDVTRoute;
