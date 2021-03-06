import {
  Form,
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import {
  changeMa,
  changePassword,
  loginAsync,
  selectLoginError,
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
  const err = useSelector(selectLoginError);
  const [showPassword, setShowPassword] = useState(false);
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
    if (token) {
      dispatch(checkRoleAsync());
      // navigate(location.state ? location.state.from : "/");
      navigate("/");
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
    <div
      className={clsx(
        "min-vh-100 d-flex flex-row align-items-center",
        style.backgroundImg
      )}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup className="shadow-lg">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>????ng nh???p</h1>
                    <p className="text-muted">
                      ????ng nh???p b???ng t??i kho???n nh??n vi??n
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroupText>
                      <Input
                        placeholder="M?? nh??n vi??n ..."
                        value={ma}
                        onChange={handleMaChange}
                        invalid={!!err}
                      />
                    <FormFeedback>
                      {err?.data}
                    </FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroupText>
                      <Input
                        type="password"
                        placeholder="M???t kh???u ..."
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs={6}>
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={handleButtonClick}
                        >
                          ????ng nh???p
                        </Button>
                      </Col>
                      <Col xs={6} className={style.textRight}>
                        <Button color="link" className="px-0">
                          Qu??n m???t kh???u?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className={clsx("py-5", style.backgroundCard)}
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>C??ng v??n ??i???n t???</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );

  // return (
  //   <div className={style.containerLogin100}>
  //     <div className={style.wrapLogin100}>
  //       <span className={clsx(style.login100FormTitle, style.pb41)}>
  //         ????ng nh???p h??? th???ng
  //       </span>
  //       <Form
  //         className={clsx(
  //           style.login100Form,
  //           style.validateForm,
  //           style.pb33,
  //           style.pt5
  //         )}
  //       >
  //         <FormGroup
  //           className={clsx(
  //             style.wrapInput100,
  //             style.validateInput,
  //             style.inputMa
  //           )}
  //         >
  //           <Input
  //             type="text"
  //             value={ma}
  //             placeholder="M?? c??n b???..."
  //             onChange={handleMaChange}
  //             name="ma"
  //             id="ma"
  //             className={style.input100}
  //             invalid={!!err}
  //           />
  //           <FormFeedback className={style.formFeedback}>
  //             {err?.data}
  //           </FormFeedback>
  //         </FormGroup>
  //         <FormGroup
  //           className={clsx(
  //             style.wrapInput100,
  //             style.validateInput,
  //             style.inputPassword
  //           )}
  //         >
  //           <Input
  //             type={showPassword ? "text" : "password"}
  //             value={password}
  //             placeholder="M???t kh???u..."
  //             onChange={handlePasswordChange}
  //             name="password"
  //             id="password"
  //             className={style.input100}
  //           />
  //           {showPassword ? (
  //             <FontAwesomeIcon
  //               icon={faEyeSlash}
  //               className={style.iconEye}
  //               onClick={() => setShowPassword(false)}
  //             />
  //           ) : (
  //             <FontAwesomeIcon
  //               icon={faEye}
  //               className={style.iconEye}
  //               onClick={() => setShowPassword(true)}
  //             />
  //           )}
  //         </FormGroup>
  //         <FormGroup className={clsx(style.containerLogin100FormBtn)}>
  //           <Button
  //             className={clsx(style.login100FormBtn)}
  //             onClick={handleButtonClick}
  //           >
  //             ????ng nh???p
  //           </Button>
  //         </FormGroup>
  //       </Form>
  //     </div>
  //   </div>
  // );
}

export default Login;
