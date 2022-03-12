import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";

import Login from "./features/login/Login";
import Home from "./features/home/Home";
import Admin from "./features/admin/home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import { useSelector } from "react-redux";
import { selectLoginToken } from "./features/login/loginSlice";
import Logout from "./features/login/Logout";

function App() {
  const token = useSelector(selectLoginToken);

  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |
        {token === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/logout">Logout</Link>
        )}{" "}
        |<Link to="/admin">Admin</Link>
      </nav>
      <Container>
        <Row>
          <Col className="col-md-12">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedAdminRoutes />}>
                  <Route path="/admin" element={<Admin />}></Route>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
