import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from 'reactstrap';

import Login from "./features/login/Login";

function App() {
  return (
    <Container>
      <Row>
        <Col className="col-md-12">
          <Login></Login>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
