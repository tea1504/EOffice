import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import { removeToken, selectLoginToken } from './loginSlice'

const Logout = () => {
  const token = useSelector(selectLoginToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    dispatch(removeToken());
  };

  useEffect(()=>{
    if(token===null)
      navigate('/login');
  }, [token]);

  return (
    <div>
      <Button onClick={handleButtonClick}>Logout</Button>
    </div>
  );
};

export default Logout;
