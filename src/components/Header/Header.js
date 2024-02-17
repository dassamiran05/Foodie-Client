import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/img/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CartIcon,
  EmailIcon,
  MobileIcon,
  UserIcon,
} from "../svgIcons/Svgicons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import {
  calculateTotalprice,
  removeItemfromCart,
} from "../../redux/features/cart/cartSlice";

const mobileNavigation = [
  {
    id: 1,
    parent: "Home",
    children: [],
    path: "/",
  },
  {
    id: 2,
    parent: "menus",
    children: [],
    path: "/menu",
  },
  {
    id: 3,
    parent: "shop",
    children: [
      { name: "our product", path: "/products" },
      { name: "shop cart", path: "/cart" },
    ],
  },
  {
    id: 4,
    parent: "News",
    children: [
      { name: "our blog", path: "/ourblog" },
      { name: "blog details", path: "blogdetails" },
    ],
  },
  {
    id: 5,
    parent: "Pages",
    children: [{ name: "about", path: "/about" }],
  },
  {
    id: 6,
    parent: "Contacts",
    path: "/contact",
    children: [],
  },
];

const Header = () => {
  const [click, setClick] = useState(false);
  const [activeclasses, setActiveclass] = useState([]);
  const [showcartpopup, setShowcartpopup] = useState(false);
  const clickRef = useRef(null);

  const { userToken, userInfo } = useSelector((state) => state.auth);

  const { cart, totalprice, iscouponApplied } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!iscouponApplied) {
      dispatch(calculateTotalprice());
    }
  }, [dispatch, iscouponApplied]);

  useEffect(() => {
    if (showcartpopup) {
      setShowcartpopup(false);
    }
  }, [pathname]);

  const handleClickOutside = (e) => {
    if (!clickRef?.current?.contains(e.target)) {
      setShowcartpopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleMobilenavActiveclass = (item) => {
    const exists = activeclasses.find((itm) => itm.id === item.id);

    setActiveclass(
      exists
        ? activeclasses.filter((itm, ind) => itm.id !== item.id)
        : [...activeclasses, { ...item }]
    );

    if (item.children.length === 0) {
      setClick(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  const handleRemovecartItem = (id) => {
    dispatch(removeItemfromCart(id));
    dispatch(calculateTotalprice());
  };
  return (
    <header className="one">
      <div className="top-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div className="d-flex align-items-center">
                <div className="content-header me-5">
                  <i>
                    <MobileIcon />
                  </i>
                  <h4>
                    Phone:
                    <Link to="callto:+1(850)344066">+1 (850) 344 0 66</Link>
                  </h4>
                </div>
                <div className="content-header">
                  <i>
                    <EmailIcon />
                  </i>
                  <h4>
                    Email:<Link to="mailto:+1(850)344066">info@domain.com</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="d-flex align-items-center login">
                <div className="register d-flex align-items-center gap-2">
                  {userInfo?.profile ? (
                    <div style={{ width: "40px", height: "40px" }}>
                      <img
                        className="w-100 h-100 object-cover"
                        style={{ borderRadius: "50%" }}
                        src={userInfo?.profile}
                        alt={userInfo?.name}
                      />
                    </div>
                  ) : (
                    <i>
                      <UserIcon />{" "}
                    </i>
                  )}

                  {userToken ? (
                    <>
                      <span className="me-2">
                        Hi {userInfo?.name.split(" ")[0]}
                      </span>
                      {userInfo.role === 1 && (
                        <span className="me-2">
                          <Link to={"/dashboard/home"}>Dashboard</Link>
                        </span>
                      )}
                      <span className="me-2">
                        <Link to={"/"} onClick={handleLogout}>
                          Logout
                        </Link>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="me-2">
                        <Link to="/login">Login</Link>
                      </span>
                      <span>
                        {" "}
                        <Link to="register"> Register</Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="logo">
                  <Link to="/">
                    <img alt="logo" src={logo} />
                  </Link>
                </div>
                <div className="d-flex align-items-center cart-checkout">
                  {cart.length > 0 && <span>{cart.length}</span>}
                  <Link to="/cart">
                    <i>
                      <CartIcon />
                    </i>
                  </Link>
                  <div className="bar-menu" onClick={() => setClick(true)}>
                    <GiHamburgerMenu />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <nav className="navbar">
                <ul className="navbar-links">
                  <li className="navbar-dropdown">
                    <Link to="/">home</Link>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="/menu">Menus</Link>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="#">Shop</Link>
                    <div className="dropdown">
                      <Link to="/products">our product</Link>
                      <Link to="/cart">shop cart</Link>
                      {/* <Link to="/checkout">cart checkout</Link> */}
                    </div>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="#">News</Link>
                    <div className="dropdown">
                      <Link to="/ourblog">our blog</Link>
                      <Link to="/blogdetails">blog details</Link>
                    </div>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="#">Pages</Link>
                    <div className="dropdown">
                      <Link to="/about">about</Link>
                    </div>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="hamburger-icon">
                <div className="donation" ref={clickRef}>
                  {cart.length > 0 && <span>{cart.length}</span>}

                  <Link
                    to="#"
                    className="pr-cart"
                    onClick={() => setShowcartpopup(!showcartpopup)}
                  >
                    <CartIcon />
                  </Link>
                  <div
                    className={`cart-popup ${showcartpopup ? "show-cart" : ""}`}
                    style={{ height: cart.length === 0 ? "auto" : "400px" }}
                  >
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowcartpopup(false)}
                    >
                      ×
                    </button>
                    <ul>
                      {cart?.length > 0 ? (
                        <>
                          {cart.map((item, index) => {
                            const { photo, name, cartQuantity, price, _id } =
                              item;
                            return (
                              <>
                                <li
                                  className="d-flex align-items-center position-relative"
                                  key={index + 1}
                                >
                                  <div className="p-img light-bg">
                                    <img src={photo} alt="" />
                                  </div>
                                  <div className="p-data">
                                    <h3 className="font-semi-bold">{name}</h3>
                                    <p className="theme-clr font-semi-bold">
                                      {cartQuantity} x ${price}
                                    </p>
                                  </div>
                                  <Link
                                    to="#"
                                    id="crosss"
                                    onClick={() => handleRemovecartItem(_id)}
                                  />
                                </li>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <p> The cart is Empty</p>
                      )}
                    </ul>
                    {cart?.length > 0 && (
                      <>
                        <div className="cart-total d-flex align-items-center justify-content-between">
                          <span className="font-semi-bold">Total:</span>
                          <span className="font-semi-bold">${totalprice}</span>
                        </div>
                        <div className="cart-btns d-flex align-items-center justify-content-between">
                          <Link className="font-bold text-white" to="/cart">
                            View Cart
                          </Link>
                          <Link
                            className="font-bold theme-bg-clr text-white checkout"
                            to="/checkout"
                          >
                            Checkout
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {userInfo.role !== 1 && (
                  <Link to="/contact" className="button">
                    Reserve a Table
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mobile-nav ${click ? "open" : ""} hmburger-menu`}
        id="mobile-nav"
        style={{ display: "block" }}
      >
        <div className="res-log">
          <Link to="index.html">
            <img src={logo} alt="Responsive Logo" className="white-logo" />
          </Link>
        </div>
        <ul>
          {mobileNavigation.map((item, indx) => {
            // console.log(item.active);
            return (
              <>
                <li
                  className={`${
                    item?.children?.length > 0 && "menu-item-has-children"
                  } ${
                    activeclasses.some((it) => it.id === item.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleMobilenavActiveclass(item)}
                  key={indx + 1}
                >
                  <Link to={item?.path}>{item.parent}</Link>
                  <ul className="sub-menu">
                    {item?.children?.map((item2, inx) => {
                      return (
                        <>
                          <li key={inx + 1}>
                            <Link to={item2?.path}>{item2?.name}</Link>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </li>
              </>
            );
          })}
        </ul>
        <Link
          to="#"
          id="res-cross"
          onClick={() => setClick(false)}
        />
      </div>
    </header>
  );
};

export default Header;
