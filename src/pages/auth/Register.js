import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/auth/authActions";
import Loader from "../../components/loader/Loader";
import { reset } from "../../redux/features/auth/authSlice";

const Register = () => {
  const { loading, message, success } = useSelector((state) => state.auth);
  // console.log(loading, message, success);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/login");
    }

    setTimeout(() => {
      dispatch(reset());
    }, 2000);
  }, [navigate, success, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      // .matches(/^[A-Za-z]+$/, "Only letters required"),
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
      // console.log(values);
      dispatch(registerUser(values));
      formik.handleReset();
    },
  });

  return (
    <>
      {loading && <Loader />}
      <section
        className="banner"
        style={{
          backgroundImage: `url(${require("../../assets/img/background.png")})`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="title-area-data">
                <h2>Register</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Register
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
      </section>
      <section className="gap">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="box register">
                <div
                  className="parallax"
                  style={{
                    backgroundImage: `url(${require("../../assets/img/patron.jpg")})`,
                  }}
                />
                <h3>Log In Your Account</h3>
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Complete Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    style={{
                      border:
                        formik.touched.name &&
                        formik.errors.name &&
                        "2px solid yellow",
                    }}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-white">{formik.errors.name}</div>
                  ) : null}
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
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                  </p>
                  <button type="submit" className="button">
                    Register
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

export default Register;
