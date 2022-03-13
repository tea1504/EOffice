import {
  Form,
  Input,
  Button,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
    dispatch(checkRoleAsync());
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
    <div className={style.containerLogin100}>
      <div className={style.wrapLogin100}>
        <span className={clsx(style.login100FormTitle, style.pb41)}>
          Đăng nhập hệ thống
        </span>
        <Form
          className={clsx(
            style.login100Form,
            style.validateForm,
            style.pb33,
            style.pt5
          )}
        >
          <FormGroup className={clsx(style.wrapInput100, style.validateInput, style.inputMa)}>
            <Input
              type="text"
              value={ma}
              placeholder="Mã cán bộ..."
              onChange={handleMaChange}
              name="ma"
              id="ma"
              className={style.input100}
              invalid={!!err}
            />
            <FormFeedback className={style.formFeedback}>
              {err?.data}
            </FormFeedback>
          </FormGroup>
          <FormGroup
            className={clsx(
              style.wrapInput100,
              style.validateInput,
              style.inputPassword
            )}
          >
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Mật khẩu..."
              onChange={handlePasswordChange}
              name="password"
              id="password"
              className={style.input100}
            />
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className={style.iconEye}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className={style.iconEye}
                onClick={() => setShowPassword(true)}
              />
            )}
          </FormGroup>
          <FormGroup
            className={clsx(
              style.containerLogin100FormBtn
            )}
          >
            <Button
              className={clsx(style.login100FormBtn)}
              onClick={handleButtonClick}
            >
              Đăng nhập
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default Login;
