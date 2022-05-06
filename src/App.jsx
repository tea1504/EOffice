import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "js-cookie";

import Login from "./features/login/Login";
import Home from "./features/home/Home";
import Admin from "./features/admin/home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import Logout from "./features/login/Logout";
import Page404 from "./pages/Page404";
import "./App.css";
import { useDispatch } from "react-redux";
import { checkRoleAsync } from "./features/user/userSlice";
import { setToken } from "./features/login/loginSlice";
import { useEffect } from "react";
import LoaiCongVan from "./features/admin/loaicongvan/LoaiCongVan";
import DoKhan from "./features/admin/dokhan/DoKhan";
import DoMat from "./features/admin/domat/DoMat";
import DonVi from "./features/admin/donvi/DonVi";
import CanBo from "./features/admin/canbo/CanBo";
import CongVanDen from "./features/congvanden/CongVanDen";
import CongVanDenCreate from "./features/congvanden/CongVanDenCreate";
import CongVanDenDetail from "./features/congvanden/CongVanDenDetail";
import CongVanDenEdit from "./features/congvanden/CongVanDenEdit";
import CongVanDi from "./features/congvandi/CongVanDi";
import CongVanDiCreate from "./features/congvandi/CongVanDiCreate";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.get("jwt");
    if (token) {
      dispatch(checkRoleAsync());
      dispatch(setToken(token));
    } else navigate("/login");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}>
            <Route element={<ProtectedAdminRoutes />}>
              <Route path="admin">
                <Route path="" element={<Navigate to="home" replace />} />
                <Route path="home" element={<Admin />} />
                <Route path="loaicongvan">
                  <Route path="" element={<LoaiCongVan />} />
                </Route>
                <Route path="dokhan">
                  <Route path="" element={<DoKhan />} />
                </Route>
                <Route path="domat" element={<DoMat />} />
                <Route path="donvi" element={<DonVi />} />
                <Route path="canbo" element={<CanBo />} />
              </Route>
            </Route>
            <Route path="congvanden">
              <Route path="" element={<CongVanDen />} />
              <Route path="them" element={<CongVanDenCreate />} />
              <Route path="sua/:id" element={<CongVanDenEdit />} />
              <Route path=":id" element={<CongVanDenDetail />} />
            </Route>
            <Route path="congvandi">
              <Route path="" element={<CongVanDi />} />
              <Route path="them" element={<CongVanDiCreate />} />
              <Route path="sua/:id" element={<CongVanDenEdit />} />
              <Route path=":id" element={<CongVanDenDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
