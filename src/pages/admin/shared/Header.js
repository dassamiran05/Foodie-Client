import React, { useState } from "react";
import logo from "../../../assets/img/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdOutlineMessage } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiSignOutFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { emptyallusers, logout } from "../../../redux/features/auth/authSlice";
import profile from "../../../assets/admin/img/profile-img.jpg";
import "./header.css";
import SearchBar from "./SearchBar";

const Header = ({ toggle, setToggle }) => {
  const [click, setClick] = useState(false);
  const [showNotification, setshowNotification] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { name, role } = userInfo;
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
    if (role === 1) {
      dispatch(emptyallusers());
    }
  };

  const getShortname = () => {
    const [fname, lname] = name.split(" ");
    const final = fname.charAt(0).toUpperCase() + ". " + lname;
    return final;
  };
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between h-100">
          <Link
            to="/dashboard/home"
            className="logod d-flex align-items-center h-100"
          >
            <img src={logo} alt="" />
          </Link>
          <GiHamburgerMenu
            className="togglebtn"
            onClick={() => setToggle(!toggle)}
          />
        </div>
        <div className="search-bar">
          <SearchBar isHeader={true}/>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="#">
                <i className="bi bi-search" />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link nav-icon"
                to="#"
                data-bs-toggle="dropdown"
                onClick={() => setshowNotification(true)}
              >
                <IoMdNotificationsOutline />
                <span className="badge bg-primary badge-number">4</span>
              </Link>
              {showNotification && (
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
                  // className="notifications"
                  style={{
                    display: `${showNotification ? "block" : "none"}`,
                    width: "300px",
                  }}
                >
                  <button
                    type="button"
                    className="dash_close"
                    onClick={() => setshowNotification(false)}
                  >
                    ×
                  </button>
                  {/* <li className="dropdown-header">
                    You have 4 new notifications
                    <Link to="#">
                      <span className="badge rounded-pill bg-primary p-2 ms-2">
                        View all
                      </span>
                    </Link>
                  </li>*/}
                  <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning" />
                    <div>
                      <h4>Lorem Ipsum</h4>
                      <p style={{ lineHeight: "22px" }}>
                        Quae dolorem earum veritatis oditseno
                      </p>
                      <p>30 min. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-x-circle text-danger" />
                    <div>
                      <h4>Atque rerum nesciunt</h4>
                      <p style={{ lineHeight: "22px" }}>
                        Quae dolorem earum veritatis oditseno
                      </p>
                      <p>1 hr. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-check-circle text-success" />
                    <div>
                      <h4>Sit rerum fuga</h4>
                      <p style={{ lineHeight: "22px" }}>
                        Quae dolorem earum veritatis oditseno
                      </p>
                      <p>2 hrs. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-footer">
                    <Link to="#">Show all notifications</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-link nav-icon"
                to="#"
                data-bs-toggle="dropdown"
              >
                <MdOutlineMessage />
                <span className="badge bg-success badge-number">3</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <Link to="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <Link to="#">
                    <img
                      src={require("../../../assets/admin/img/messages-1.jpg")}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <Link to="#">
                    <img
                      src={require("../../../assets/admin/img/messages-2.jpg")}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <Link to="#">
                    <img
                      src={require("../../../assets/admin/img/messages-3.jpg")}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <Link to="#">Show all messages</Link>
                </li>
              </ul>
            </li> */}
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
                onClick={() => setClick(!click)}
              >
                <img
                  src={userInfo.profile ? userInfo.profile : profile}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {getShortname()}
                </span>
              </Link>
              <ul
                className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${
                  click ? "drop show" : ""
                }`}
              >
                <li className="dropdown-header">
                  <h6>{name}</h6>
                  <span>{role === 1 ? "Admin" : "User"}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/dashboard/profile"
                    onClick={() => setClick(false)}
                  >
                    <CgProfile
                      style={{ fontSize: "18px", marginRight: "10px" }}
                    />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={handlelogout}
                  >
                    <PiSignOutFill
                      style={{ fontSize: "18px", marginRight: "10px" }}
                    />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
