import { Form, Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  changeMa,
  changePassword,
  loginAsync,
  selectLoginMa,
  selectLoginPassword,
  selectLoginToken,
} from "./loginSlice";

function Login() {
  const ma = useSelector(selectLoginMa);
  const password = useSelector(selectLoginPassword);
  const token = useSelector(selectLoginToken);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    console.log("handleFormSubmit run ...");
    e.preventDefault();
    const form = {
      ma: ma,
      matkhau: password,
    };
    dispatch(loginAsync(form));
  };

  const handleMaChange = (e) => {
    console.log("handleMaChange run ...");
    const val = e.target.value;
    dispatch(changeMa(val));
  };

  const handlePasswordChange = (e) => {
    console.log("handlePasswordChange run ...");
    const val = e.target.value;
    dispatch(changePassword(val));
  };

  console.log("Login render");
  return (
    <>
      <div>Login</div>
      <Form onSubmit={handleFormSubmit}>
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
        <Button color="info">Đăng nhập</Button>
      </Form>
    </>
  );
}

export default Login;
