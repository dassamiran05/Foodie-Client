import React from "react";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";
import Loader from "../../components/loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleSendEmail } from "../../redux/features/auth/authActions";

const Contactus = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  const formik = useFormik({
    initialValues: {
      complete_name: "",
      email_address: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      complete_name: Yup.string().required("Required"),
      // .matches(/^[A-Za-z]+$/, "Only letters required"),
      email_address: Yup.string().required("Required").email("Invalid email"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[6-9]/, "Number should start with 6 or 7 or 8 or 9")
        .matches(/^[0-9]+$/, "Only number")
        .matches(/^[0-9]{10}$/, "Length should be 10"),
      message: Yup.string().required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(handleSendEmail({ contactData: values }));
      formik.resetForm();
    },
  });
  return (
    <>
      <Loader />
      <div>
        <Banner paths={pathArr} />
        <section className="gap">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="get-in-touch">
                  <h2>Get in Touch</h2>
                  <ul className="booking">
                    <li className="contact">
                      <i>
                        <svg
                          height={512}
                          viewBox="0 0 32 32"
                          width={512}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="_16-Smartphone" data-name="16-Smartphone">
                            <path d="m23 2h-14a3 3 0 0 0 -3 3v22a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3zm-5.39 2-.33 1h-2.56l-.33-1zm6.39 23a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1-1v-22a1 1 0 0 1 1-1h3.28l.54 1.63a2 2 0 0 0 1.9 1.37h2.56a2 2 0 0 0 1.9-1.37l.54-1.63h3.28a1 1 0 0 1 1 1z" />
                            <path d="m17 24h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2z" />
                          </g>
                        </svg>
                      </i>
                      <div>
                        <span>for booking</span>
                        <a href="callto:01123456786">
                          <span>01 123 456 786 </span>
                        </a>
                      </div>
                    </li>
                    <li className="contact">
                      <i>
                        <svg
                          height={512}
                          viewBox="0 0 32 32"
                          width={512}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="_01-Email" data-name="01-Email">
                            <path d="m29.61 12.21-13-10a1 1 0 0 0 -1.22 0l-13 10a1 1 0 0 0 -.39.79v14a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-14a1 1 0 0 0 -.39-.79zm-13.61-7.95 11.36 8.74-11.36 8.74-11.36-8.74zm11 23.74h-22a1 1 0 0 1 -1-1v-12l11.39 8.76a1 1 0 0 0 1.22 0l11.39-8.76v12a1 1 0 0 1 -1 1z" />
                          </g>
                        </svg>
                      </i>
                      <div>
                        <span>for private dining</span>
                        <a href="mailto:info@domain.com">
                          <span>info@domain.com</span>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mapouter">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26358986.39359313!2d-113.7115859681645!3d36.24800244048599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1676996184286!5m2!1sen!2s"
                    width={600}
                    height={450}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Contact"
                  />
                </div>
                <div className="align-items-center d-flex mt-3">
                  <i className="fa-solid fa-location-dot me-3" />
                  <p>
                    Harbour House, 60 Purewell, Town 23 /x Christchurch, United
                    State
                  </p>
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <i className="fa-solid fa-location-dot me-3" />
                  <p>Belfast BT4 3LP Sea Beach United State</p>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="get-in-touch">
                  <h2>Have Question?</h2>
                  <p>
                    For all enquires, please contact us and one of our
                    delightful team will be be happy to help.
                  </p>
                </div>
                <form
                  className="add-review leave-comment mt-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="row  mb-3">
                    <div className="col-12">
                      <input
                        type="text"
                        name="complete_name"
                        id="Complete_Name"
                        placeholder="Full Name"
                        onChange={formik.handleChange}
                        value={formik.values.complete_name}
                        style={{
                          border:
                            formik.touched.complete_name &&
                            formik.errors.complete_name &&
                            "2px solid red",
                        }}
                      />
                      {formik.touched.complete_name &&
                      formik.errors.complete_name ? (
                        <div className="text-danger">
                          {formik.errors.complete_name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <input
                        type="text"
                        name="email_address"
                        placeholder="Email Address"
                        id="email_address"
                        onChange={formik.handleChange}
                        value={formik.values.email_address}
                        style={{
                          border:
                            formik.touched.email_address &&
                            formik.errors.email_address &&
                            "2px solid red",
                        }}
                      />
                      {formik.touched.email_address &&
                      formik.errors.email_address ? (
                        <div className="text-danger">
                          {formik.errors.email_address}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone No"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        style={{
                          border:
                            formik.touched.phone &&
                            formik.errors.phone &&
                            "2px solid red",
                        }}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <textarea
                        placeholder="Drop your message here"
                        name="message"
                        defaultValue={""}
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        style={{
                          border:
                            formik.touched.message &&
                            formik.errors.message &&
                            "2px solid red",
                        }}
                      />
                      {formik.touched.message && formik.errors.message ? (
                        <div className="text-danger">
                          {formik.errors.message}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <button className="button" type="submit">
                    <span>{loading ? "Loading..." : "send Message"}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="blog-img-video video mb-0">
            <img
              alt="video-img"
              src={require("../../assets/img/contact.jpg")}
            />
            <a data-fancybox href="https://www.youtube.com/watch?v=1La4QzGeaaQ">
              <i>
                <svg
                  width={15}
                  height={22}
                  viewBox="0 0 11 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 8.5L0.5 0.272758L0.5 16.7272L11 8.5Z"
                    fill="#fff"
                  />
                </svg>
              </i>
            </a>
          </div>
        </div>
        <div className="container">
          <div className="opening-hours">
            <div className="day-time">
              <h6>Monday - Friday</h6>
              <h4>12pm - 11pm</h4>
              <span>Open all day</span>
            </div>
            <div className="boder-line" />
            <div className="day-time">
              <h6>Saturday</h6>
              <h4>11:30am - 11pm</h4>
              <span>Open all day</span>
            </div>
            <div className="boder-line" />
            <div className="day-time">
              <h6>Monday - Friday</h6>
              <h4>12pm - 11pm</h4>
              <span>Open all day</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
