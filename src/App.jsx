import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "reactstrap";

import Login from "./features/login/Login";
import Home from "./features/home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      </nav>
      <Container>
        <Row>
          <Col className="col-md-12">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
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
