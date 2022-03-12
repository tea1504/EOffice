import { Form, Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  changeMa,
  changePassword,
  loginAsync,
  selectLoginMa,
  selectLoginPassword,
  selectLoginToken,
} from "./loginSlice";
import { checkRoleAsync } from "../user/userSlice";

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
    if (token !== null) {
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
    <>
      <div>Login</div>
      <Form>
        <Input
          type="text"
          value={ma}
          placeholder="Mã cán bộ..."
          onChange={handleMaChange}
          name="ma"
          id="ma"
        />
        <Input
          type="password"
          value={password}
          placeholder="Mật khẩu..."
          onChange={handlePasswordChange}
          name="password"
          id="password"
        />
        <Button color="info" onClick={handleButtonClick}>
          Đăng nhập
        </Button>
      </Form>
    </>
  );
}

export default Login;
