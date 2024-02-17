import React from "react";
import Skeleton from "@mui/material/Skeleton";

const Profileloader = () => {
  return (
    <section className="section profile">
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
              <Skeleton
                variant="circular"
                width={85}
                height={85}
                className="mb-2"
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={50} />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered d-flex gap-3">
                <Skeleton animation={false} width="20%" height={50} />
                <Skeleton animation={false} width="20%" height={50} />
                <Skeleton animation={false} width="20%" height={50} />
              </ul>
              <div className="pt-2">
                {/* <div
                  className={`tab-pane fade profile-overview`}
                  id="profile-overview"
                >
                  <h5 className="card-title">About</h5>
                  <p className="small fst-italic">{userInfo.about}</p>
                  <h5 className="card-title">Profile Details</h5>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
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
                    <div className="col-lg-9 col-md-8">{userInfo.country}</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Phone</div>
                    <div className="col-lg-9 col-md-8">{userInfo.phone}</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Email</div>
                    <div className="col-lg-9 col-md-8">{userInfo.email}</div>
                  </div>
                </div> */}
                <div className={`pt-3`} id="profile-edit">
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-4 col-lg-3">
                        <Skeleton variant="text" height={25} width={90} />
                      </div>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="circular" width={120} height={120} />
                        <div className="pt-2 profile-icon d-flex gap-2">
                          <Skeleton
                            variant="rectangular"
                            width={30}
                            height={30}
                          />
                          <Skeleton
                            variant="rectangular"
                            width={30}
                            height={30}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="name"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        <Skeleton variant="text" height={25} width={90} />
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="rectangular" height={40} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="about"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        <Skeleton variant="text" height={25} width={90} />
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="rectangular" height={100} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Country"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        <Skeleton variant="text" height={25} width={90} />
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="rectangular" height={40} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Phone"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        <Skeleton variant="text" height={25} width={90} />
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="rectangular" height={40} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Email"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        <Skeleton variant="text" height={25} width={90} />
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <Skeleton variant="rectangular" height={40} />
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <Skeleton variant="rectangular" width={100} height={40} />
                    </div>
                  </form>
                </div>
                {/* <div
                  className={`tab-pane fade pt-3 ${
                    activelink === 3 ? "show active" : ""
                  }`}
                  id="profile-change-password"
                >
                  <form>
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
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profileloader;
