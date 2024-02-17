import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { changePassword } from "../../redux/features/auth/authActions";

const ChangePassword = () => {
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required("Required")
        .min(6, "Minimum 6 Character")
        .matches(/[A-Z]/, "Atleast One Uppercase")
        .matches(/[a-z]/, "Atleast One Lowercase")
        .matches(/[0-9]/, "Atleast One Number")
        .matches(/[^\w]/, "Atleast One Special Character")
        .matches(/^[^\s]*$/, "Space not allowed"),

      newPassword: Yup.string()
        .min(6, "Min 6 characters")
        .required("New password is required")
        .matches(/[A-Z]/, "Atleast One Uppercase")
        .matches(/[a-z]/, "Atleast One Lowercase")
        .matches(/[0-9]/, "Atleast One Number")
        .matches(/[^\w]/, "Atleast One Special Character")
        .matches(/^[^\s]*$/, "Space not allowed"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: (values) => {
      dispatch(changePassword({ token: userToken, passwordData: values }));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mb-3">
        <label
          htmlFor="currentPassword"
          className="col-md-4 col-lg-3 col-form-label"
        >
          Current Password
        </label>
        <div className="col-md-8 col-lg-9">
          <input
            name="currentPassword"
            type="password"
            className="form-control"
            id="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            style={{
              border:
                formik.touched.currentPassword &&
                formik.errors.currentPassword &&
                "2px solid red",
            }}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword ? (
            <div className="text-danger">{formik.errors.currentPassword}</div>
          ) : null}
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="newPassword"
          className="col-md-4 col-lg-3 col-form-label"
        >
          New Password
        </label>
        <div className="col-md-8 col-lg-9">
          <input
            name="newPassword"
            type="password"
            className="form-control"
            id="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            style={{
              border:
                formik.touched.newPassword &&
                formik.errors.newPassword &&
                "2px solid red",
            }}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-danger">{formik.errors.newPassword}</div>
          ) : null}
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="renewPassword"
          className="col-md-4 col-lg-3 col-form-label"
        >
          Re-enter New Password
        </label>
        <div className="col-md-8 col-lg-9">
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            id="renewPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            style={{
              border:
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "2px solid red",
            }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-danger">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
