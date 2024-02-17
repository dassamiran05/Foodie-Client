import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import profile from "../../assets/profileImage.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "../admin/PreviewImage";
import { handleUpdateProfile } from "../../redux/features/auth/authActions";
import Profileloader from "../admin/loader/Profileloader";
import ChangePassword from "./ChangePassword";
const tablinks = [
  {
    id: 1,
    tag: "profile-overview",
    title: "Overview",
  },
  {
    id: 2,
    tag: "profile-edit",
    title: "Edit Profile",
  },
  {
    id: 3,
    tag: "profile-change-password",
    title: "Change Password",
  },
];

const Profile = () => {
  const [activelink, setActivelink] = useState(1);
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(userInfo);
  // console.log(userInfo);
  // const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setUserDetails(userInfo);
    }
  }, [userInfo]);
  const { name, about, country, phone, profile } = userDetails;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: name ? name : "",
      about: about ? about : "",
      country: country ? country : "",
      phone: phone ? phone : "",
      profile: profile ? profile : "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Required")
        .matches(/^[A-Za-z ]+$/, "Only letters required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[6-9]/, "Number should start with 6 or 7 or 8 or 9")
        .matches(/^[0-9]+$/, "Only number")
        .matches(/^[0-9]{10}$/, "Length should be 10"),
      // password: Yup.string()
      //   .required("Required")
      //   .min(6, "Minimum 6 Character")
      //   .matches(/[A-Z]/, "Atleast One Uppercase")
      //   .matches(/[a-z]/, "Atleast One Lowercase")
      //   .matches(/[0-9]/, "Atleast One Number")
      //   .matches(/[^\w]/, "Atleast One Special Character")
      //   .matches(/^[^\s]*$/, "Space not allowed"),
      // email: Yup.string().required("Required").email("Invalid email"),
      about: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      profile: Yup.mixed()
        .required("Required")
        .test("is-file-too-big", "File exceeds 10MB", (value) => {
          // console.log(value, Array.from(value));
          let valid = true;
          // const files = fileRef?.current?.files;
          // const files = values?.files;
          if (value) {
            const fileArr = Array.from(value);
            fileArr.forEach((file) => {
              const size = file?.size / 1024 / 1024;
              if (size > 10) {
                valid = false;
              }
            });
          }
          return valid;
        })
        .test(
          "is-file-of-correct-type",
          "File is not of supported type",
          (value) => {
            let valid = true;
            // const files = fileRef?.current?.files;
            if (value) {
              const fileArr = Array.from(value);
              fileArr.forEach((file) => {
                const type = file?.type?.split("/")[1];
                const validTypes = ["rtf", "jpeg", "png", "jpg", "ogg", "gif"];
                if (!validTypes.includes(type)) {
                  valid = false;
                }
              });
            }
            return valid;
          }
        ),
    }),
    onSubmit: (values) => {
      let formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const data = {
        token: userToken,
        udata: formData,
      };

      dispatch(handleUpdateProfile(data)).then((data) => {
        if (data.payload.success) {
          setUserDetails({});
        }
      });
    },
  });
  // const handleUpload = (e) => {
  //   e.preventDefault();
  // };
  const handleDelete = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <Profileloader />
      ) : (
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {userInfo.profile && (
                    <img
                      src={userInfo.profile}
                      alt="Profile"
                      className="rounded-circle"
                    />
                  )}

                  <h2>{userInfo.name}</h2>
                  <h3>{userInfo.role === 1 && "Admin"}</h3>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    {tablinks.map((tablnk) => (
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            tablnk.id === activelink ? "active" : ""
                          }`}
                          data-bs-toggle="tab"
                          data-bs-target={`#${tablnk.tag}`}
                          onClick={() => setActivelink(tablnk.id)}
                        >
                          {tablnk.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className={`tab-pane fade ${
                        activelink === 1 ? "show active" : ""
                      } profile-overview`}
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">{userInfo.about}</p>
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">{userInfo.name}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job</div>
                        <div className="col-lg-9 col-md-8">
                          {userInfo.role && "Admin"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Country</div>
                        <div className="col-lg-9 col-md-8">
                          {userInfo.country}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                          {userInfo.phone}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {userInfo.email}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activelink === 2 ? "show active" : ""
                      } profile-edit pt-3`}
                      id="profile-edit"
                    >
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row mb-3">
                          <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            {formik.values.profile ? (
                              <>
                                <PreviewImage
                                  file={formik.values.profile}
                                  single={true}
                                />
                              </>
                            ) : (
                              <img src={profile} alt="Profile" />
                            )}
                            <div className="pt-2 profile-icon d-flex gap-2">
                              {/* <button
                            className="btn btn-primary btn-sm"
                            title="Upload new profile image"
                            onClick={handleUpload}
                          >
                            <input type="file" id="profile" name="profile"/>
                            <IoCloudUploadOutline />
                          </button> */}
                              <label
                                for="test"
                                className="btn btn-primary btn-sm profileLabel"
                              >
                                <IoCloudUploadOutline />
                                <input
                                  type="file"
                                  id="profile"
                                  name="profile"
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      "profile",
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </label>

                              <button
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                                onClick={handleDelete}
                              >
                                <MdDelete />
                              </button>
                            </div>
                            {formik.touched.profile && formik.errors.profile ? (
                              <div className="text-danger">
                                {formik.errors.profile}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="name"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              id="name"
                              defaultValue="Kevin Anderson"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              style={{
                                border:
                                  formik.touched.name &&
                                  formik.errors.name &&
                                  "2px solid red",
                              }}
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="text-danger">
                                {formik.errors.name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="about"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            About
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              name="about"
                              className="form-control"
                              id="about"
                              defaultValue={
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                              }
                              onChange={formik.handleChange}
                              value={formik.values.about}
                              style={{
                                height: 100,
                                border:
                                  formik.touched.about &&
                                  formik.errors.about &&
                                  "2px solid red",
                              }}
                            />
                            {formik.touched.about && formik.errors.about ? (
                              <div classaName="text-danger">
                                {formik.errors.about}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Country"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Country
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="country"
                              type="text"
                              className="form-control"
                              id="Country"
                              defaultValue="USA"
                              onChange={formik.handleChange}
                              value={formik.values.country}
                              style={{
                                border:
                                  formik.touched.country &&
                                  formik.errors.country &&
                                  "2px solid red",
                              }}
                            />
                            {formik.touched.country && formik.errors.country ? (
                              <div classaName="text-danger">
                                {formik.errors.country}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="Phone"
                              defaultValue="95698 23564"
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
                              <div classaName="text-danger">
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="Email"
                              disabled
                              defaultValue={userInfo.email}
                              // onChange={formik.handleChange}
                              // value={formik.values.email}
                              // style={{
                              //   border:
                              //     formik.touched.email &&
                              //     formik.errors.email &&
                              //     "2px solid red",
                              // }}
                            />
                            {/* {formik.touched.email && formik.errors.email ? (
                          <div classaName="text-danger">
                            {formik.errors.email} 
                          </div>
                        ) : null } */}
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                      {/* End Profile Edit Form */}
                    </div>
                    <div
                      className={`tab-pane fade pt-3 ${
                        activelink === 3 ? "show active" : ""
                      }`}
                      id="profile-change-password"
                    >
                      {/* Change Password Form */}
                      {/* <form>
                        <div className="row mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="currentPassword"
                            />
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
                              name="newpassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                            />
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
                              name="renewpassword"
                              type="password"
                              className="form-control"
                              id="renewPassword"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form> */}
                      <ChangePassword />
                      {/* End Change Password Form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
