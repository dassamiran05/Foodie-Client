import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/auth/authActions";
import Loader from "../../components/loader/Loader";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";

const Login = () => {
  const { userToken, userInfo } = useSelector(
    (state) => state.auth
  );
  // console.log(loading, message, success);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = usePathname();
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  useEffect(() => {
    if (userToken) {
      return userInfo?.role === 1 ? navigate("/dashboard/home") : navigate("/");
    }
  }, [navigate, userToken, userInfo?.role]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(6, "Minimum 6 Character")
        .matches(/[A-Z]/, "Atleast One Uppercase")
        .matches(/[a-z]/, "Atleast One Lowercase")
        .matches(/[0-9]/, "Atleast One Number")
        .matches(/[^\w]/, "Atleast One Special Character")
        .matches(/^[^\s]*$/, "Space not allowed"),
      email: Yup.string().required("Required").email("Invalid email"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
      formik.handleReset();
    },
  });
  return (
    <>
      <Loader />
      {/* <section
        className="banner"
        style={{
          backgroundImage: `url(${require("../../assets/img/background.png")})`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="title-area-data">
                <h2>Login</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  login
                </li>
              </ol>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-6">
                  <div className="title-area-img">
                    <img
                      alt="title-area-img"
                      src={require("../../assets/img/title-area-img-1.jpg")}
                    />
                    <img
                      alt="pata"
                      className="pata"
                      src={require("../../assets/img/pata.png")}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="title-area-img two">
                    <img
                      alt="title-area-img"
                      src={require("../../assets/img/title-area-img-2.jpg")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Banner paths={pathArr} />
      <section className="gap">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="box login">
                <div
                  className="parallax"
                  style={{
                    backgroundImage: `url(${require("../../assets/img/patron.jpg")})`,
                  }}
                />
                <h3 className="loginacc">Log In Your Account</h3>
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Username or email address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    style={{
                      border:
                        formik.touched.email &&
                        formik.errors.email &&
                        "2px solid yellow",
                    }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-white">{formik.errors.email}</div>
                  ) : null}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    style={{
                      border:
                        formik.touched.password &&
                        formik.errors.password &&
                        "2px solid yellow",
                    }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-white">{formik.errors.password}</div>
                  ) : null}
                  {/* <div className="remember d-flex justify-content-end mt-0">
                    <div className="first">
                      <input type="checkbox" name="checkbox" id="checkbox" />
                      <label htmlFor="checkbox">Remember me</label>
                    </div>
                    <div className="second forget">
                      <Link to="#">Forget a Password?</Link>
                    </div>
                  </div> */}
                  <button type="submit" className="button lgon">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
