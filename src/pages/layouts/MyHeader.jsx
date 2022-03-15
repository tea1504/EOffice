import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "reactstrap";
import img from '../../logo192.png'

export const MyHeader = () => {
  return (
    <div className="header">
      <Container fluid style={{ display: "flex" }}>
        <Button className="header-toggler px-0">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <ul className="header-nav d-none d-md-flex">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Dashboard
            </a>
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
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faBars} />
            </a>
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
