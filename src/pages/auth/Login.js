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
  const { userToken, userInfo } = useSelector((state) => state.auth);
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
      return location.state?.from?.pathname
        ? navigate(location.state.from.pathname)
        : userInfo?.role === 1
        ? navigate("/dashboard/home")
        : navigate("/");
    }

  }, [navigate, userToken, userInfo?.role, location.state?.from?.pathname]);

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
      dispatch(loginUser(values));
      formik.handleReset();
    },
  });
  return (
    <>
      <Loader />
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
