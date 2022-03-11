import { useState } from "react";
import { Alert, Button, Col, Container, Form, Input, Row } from "reactstrap";
import cookie from "js-cookie";

import apiLogin from "../apis/Login";
import Loading from "./Loading";

function Login() {
  const [ma, setMa] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const temp = await apiLogin.login({ ma: ma, matkhau: password });
      cookie.set("jwt", temp.data, { expires: 1 });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Loading loading={loading} />
      <Container fluid>
        <Row>
          <Col className="col-md-12">
            <Alert color="danger">
              <h2>Login</h2>
            </Alert>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="col-md-6">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Input
                type="text"
                placeholder="Mã số"
                className="mb-2"
                name="ma"
                value={ma}
                onChange={(e) => setMa(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Mật khẩu"
                className="mb-2"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button>Gửi</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
