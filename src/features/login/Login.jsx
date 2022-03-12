import {
  Form,
  Input,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import clsx from "clsx";

import {
  changeMa,
  changePassword,
  loginAsync,
  selectLoginMa,
  selectLoginPassword,
  selectLoginToken,
} from "./loginSlice";
import { checkRoleAsync } from "../user/userSlice";
import style from "./Login.module.scss";

function Login() {
  const ma = useSelector(selectLoginMa);
  const password = useSelector(selectLoginPassword);
  const token = useSelector(selectLoginToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (e) => {
    e.preventDefault();
    const form = {
      ma: ma,
      matkhau: password,
    };
    dispatch(loginAsync(form));
  };

  useEffect(() => {
    dispatch(checkRoleAsync());
    console.log(token);
    if (token) {
      navigate(location.state ? location.state.from : "/");
    }
  }, [token]);

  const handleMaChange = (e) => {
    const val = e.target.value;
    dispatch(changeMa(val));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    dispatch(changePassword(val));
  };

  return (
    <div className={clsx(style.background, style.img)}>
      <section className={style.section}>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-md-6 text-center mb-5">
              <div className={style.headingSection}>Hệ thống quản lý công văn</div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-md-6 col-lg-4">
              <div className={clsx("p-0", style.loginWrap)}>
                <h3 className="mb-4 text-center">Đăng nhập</h3>
                <Form>
                  <FormGroup>
                    <Input
                      type="text"
                      value={ma}
                      placeholder="Mã cán bộ..."
                      onChange={handleMaChange}
                      name="ma"
                      id="ma"
                      className={style.input}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      value={password}
                      placeholder="Mật khẩu..."
                      onChange={handlePasswordChange}
                      name="password"
                      id="password"
                      className={style.input}
                    />
                  </FormGroup>

                  <Button
                    className={clsx("form-control", style.button)}
                    onClick={handleButtonClick}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Login;
