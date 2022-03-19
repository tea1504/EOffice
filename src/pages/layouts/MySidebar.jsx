import { faBook, faDashboard, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserAdmin } from "../../features/user/userSlice";

export const MySidebar = () => {
  const admin = useSelector(selectUserAdmin);

  return (
    <div className="sidebar">
      <div className="sidebar-brand d-none d-md-flex">alo</div>
      <ul className="sidebar-nav">
        <div className="simplebar-wrapper">
          <div className="simplebar-mark">
            <div className="simplebar-offset">
              <div className="simplebar-content-wrapper">
                <div className="simplebar-content">
                  {admin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin">
                        <FontAwesomeIcon
                          className="nav-icon"
                          icon={faDashboard}
                        />
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/loaicongvan">
                        <FontAwesomeIcon
                          className="nav-icon"
                          icon={faBook}
                        />
                        Loại công văn
                      </NavLink>
                    </li>
                  )}
                  {admin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/dokhan">
                        <FontAwesomeIcon
                          className="nav-icon"
                          icon={faPersonRunning}
                        />
                        Độ khẩn
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
