import { Route, Routes, useNavigate } from "react-router-dom";
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
                <Route path="" element={<Admin />} />
                <Route path="loaicongvan">
                  <Route path="" element={<LoaiCongVan />} />
                </Route>
                <Route path="dokhan">
                  <Route path="" element={<DoKhan />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
