import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { handleCreateCoupon } from "../../redux/features/admin/coupon/couponActions";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

const CustomField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <input
            {...field}
            {...props}
            className={`form-control ${
              meta.touched && meta.error ? "input-error" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-danger">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};

const Addcoupon = () => {
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialval = {
    name: "",
    expiry: "",
    maxlimitprice:"",
    discount: "",
  };
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Coupon</h5>
              <Formik
                enableReinitialize={true}
                initialValues={initialval}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .matches(/[A-Z]/, "Only Uppercase")
                    .min(6, "Minimum 6 Character")
                    .max(10, "Maximum 10 Character")
                    .required("Required"),
                  expiry: Yup.date().required("Required"),
                  maxlimitprice: Yup.number().required("Required"),
                  discount: Yup.string().required("Required"),
                })}
                onSubmit={(values, actions) => {
                  dispatch(
                    handleCreateCoupon({ values, accessToken: userToken })
                  );
                  actions.resetForm();
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  touched,
                  values,
                  formProps,
                }) => (
                  <>
                    <Form>
                      <CustomField name="name" type="text" label="Coupon" />
                      <CustomField
                        name="expiry"
                        type="date"
                        label="Expiry Date"
                      />
                      <CustomField
                        name="maxlimitprice"
                        type="number"
                        label="Maximum price"
                      />
                      <CustomField
                        name="discount"
                        type="number"
                        label="Discount"
                      />
                      <div className="row mb-3">
                        <div className="col-sm-10">
                          {/* {loading ? (
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  disabled
                                >
                                  <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Loading...
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  {id ? "Update product" : "Submit"}
                                </button>
                              )} */}
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addcoupon;
