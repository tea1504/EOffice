import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import {
  changeMa,
  changePassword,
  removeToken,
  selectLoginToken,
} from "./loginSlice";
import { resetRole } from '../user/userSlice';

const Logout = () => {
  const token = useSelector(selectLoginToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    dispatch(changeMa(""));
    dispatch(changePassword(""));
    dispatch(resetRole());
    dispatch(removeToken());
  };

  useEffect(() => {
    if (token === null) navigate("/login");
  }, [token]);

  return (
    <div>
      <Button onClick={handleButtonClick}>Logout</Button>
    </div>
  );
};

export default Logout;
