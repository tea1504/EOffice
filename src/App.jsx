import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";

import Login from "./features/login/Login";
import Home from "./features/home/Home";
import Admin from "./features/admin/home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import Logout from "./features/login/Logout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}>
            <Route element={<ProtectedAdminRoutes />}>
              <Route path="admin" element={<Admin />}></Route>
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
