import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { selectSidebar, toggleSidebar } from "../../features/common/commonSlide";
import {
  changeMa,
  changePassword,
  removeToken,
  selectLoginToken,
} from "../../features/login/loginSlice";
import { resetRole } from "../../features/user/userSlice";
import img from "../../logo192.png";

let activeStyle = {
  textDecoration: "underline",
};

export const MyHeader = () => {
  const token = useSelector(selectLoginToken);
  const sidebar = useSelector(selectSidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(changeMa(""));
    dispatch(changePassword(""));
    dispatch(resetRole());
    dispatch(removeToken());
  };

  useEffect(() => {
    if (token === null) navigate("/login");
  }, [token]);

  const handleButtonToggleSidebar = () => {
    dispatch(toggleSidebar(!sidebar));
  };

  return (
    <div className="header">
      <Container fluid style={{ display: "flex" }}>
        <Button className="header-toggler px-0" onClick={handleButtonToggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <ul className="header-nav d-none d-md-flex">
          <li className="nav-item">
            <NavLink
              to="/admin"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Users
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
        </ul>
        <ul className="header-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faBars} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faBars} />
            </a>
          </li>
          <li className="nav-item" id="TooltipExample">
            <div
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleClickLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </li>
        </ul>
        <ul className="header-nav ms-3">
          <li className="nav-item dropdown">
            <a
              className="nav-link py-0"
              data-coreui-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="avatar avatar-md">
                <img
                  className="avatar-img img-fluid"
                  src={img}
                  alt="user@email.com"
                />
              </div>
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
};
