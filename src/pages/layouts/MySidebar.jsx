import {
  faBan,
  faBook,
  faBuilding,
  faCheckSquare,
  faDashboard,
  faFileArrowDown,
  faFileArrowUp,
  faHandsHolding,
  faPersonRunning,
  faTimesSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectUserAdmin,
  selectUserLanhDao,
  selectUserVanThu,
} from "../../features/user/userSlice";

let activeStyle = {
  // color: "white",
  opacity: "1",
};

export const MySidebar = () => {
  const admin = useSelector(selectUserAdmin);
  const lanhdao = useSelector(selectUserLanhDao);
  const vanthu = useSelector(selectUserVanThu);

  return (
    <div className="sidebar">
      <div className="sidebar-brand d-none d-md-flex">
        EOffice | Văn phòng điện tử
      </div>
      <ul className="sidebar-nav">
        <div className="simplebar-wrapper">
          <div className="simplebar-mark">
            <div className="simplebar-offset">
              <div className="simplebar-content-wrapper">
                <div className="simplebar-content">
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/home"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-primary"
                          icon={faDashboard}
                        />
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/loaicongvan"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-secondary"
                          icon={faBook}
                        />
                        Loại công văn
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/dokhan"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-success"
                          icon={faPersonRunning}
                        />
                        Độ khẩn
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/domat"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-danger"
                          icon={faBan}
                        />
                        Độ mật
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/donvi"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-warning"
                          icon={faBuilding}
                        />
                        Đơn vị
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/admin/canbo"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-info"
                          icon={faUser}
                        />
                        Cán bộ
                      </NavLink>
                    </li>
                  )}
                  {
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/congvanden"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-success"
                          icon={faFileArrowDown}
                        />
                        Công văn đến
                      </NavLink>
                    </li>
                  }
                  {
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/congvandi"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-warning"
                          icon={faFileArrowUp}
                        />
                        Công văn đi
                      </NavLink>
                    </li>
                  }
                  {(lanhdao || vanthu) && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/duyetcongvan"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-primary"
                          icon={faCheckSquare}
                        />
                        Duyệt công văn
                      </NavLink>
                    </li>
                  )}
                  {(lanhdao || vanthu) && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/congvantuchoi"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-danger"
                          icon={faTimesSquare}
                        />
                        Công văn bị từ chối
                      </NavLink>
                    </li>
                  )}
                  {(
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/xulycongvan"
                        style={({ isActive }) =>
                          isActive ? activeStyle : undefined
                        }
                      >
                        <FontAwesomeIcon
                          className="nav-icon text-secondary"
                          icon={faHandsHolding}
                        />
                        Xử lý công văn
                      </NavLink>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};
