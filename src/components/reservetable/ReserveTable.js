import React from "react";
import img from "../../assets/img/patron.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { handlereserveTable } from "../../redux/features/reservationTable/reserveSlice";

const ReserveTable = () => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      nofGuest: "",
      date: "",
      time: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email"),
      nofGuest: Yup.string().required("Required").max(5, "Maximum 5 Persons"),
      date: Yup.string().required("Required"),
      time: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(handlereserveTable(values));
      formik.handleReset();
    },
  });
  return (
    <section>
      <div className="container">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="reserve-table"
        >
          <div className="row">
            <div className="col-xl-4">
              <div className="reserve-table-text">
                <h3>reserve A table</h3>
                <p>Discover our New Menu !</p>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="best-food-restaurants">
                <form role="form" id="reservation-form" onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6">
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
                        <div className="text-white d-flex justify-content-start" >{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="col-xl-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        style={{
                          border:
                            formik.touched.email &&
                            formik.errors.email &&
                            "2px solid yellow",
                        }}
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-white d-flex justify-content-start">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6">
                      <input
                        type="number"
                        name="nofGuest"
                        placeholder="No of Guest"
                        onChange={formik.handleChange}
                        value={formik.values.nofGuest}
                        style={{
                          border:
                            formik.touched.nofGuest &&
                            formik.errors.nofGuest &&
                            "2px solid yellow",
                        }}
                      />
                      {formik.touched.nofGuest && formik.errors.nofGuest ? (
                        <div className="text-white d-flex justify-content-start">
                          {formik.errors.nofGuest}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-xl-6">
                          <input
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            style={{
                              border:
                                formik.touched.date &&
                                formik.errors.date &&
                                "2px solid yellow",
                            }}
                          />
                          {formik.touched.date && formik.errors.date ? (
                            <div className="text-white d-flex justify-content-start">
                              {formik.errors.date}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-6">
                          <input
                            type="time"
                            name="time"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                            style={{
                              border:
                                formik.touched.time &&
                                formik.errors.time &&
                                "2px solid yellow",
                            }}
                          />
                          {formik.touched.time && formik.errors.time ? (
                            <div className="text-white d-flex justify-content-start">
                              {formik.errors.time}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="button" type="submit">
                    Reserve a Table
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReserveTable;
