import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAllUsers,
  // handleMakeAdmin,
} from "../../redux/features/auth/authActions";
import GetdataLoader from "./shared/GetdataLoader";
// import { RiAdminFill } from "react-icons/ri";

const Alluser = () => {
  const dispatch = useDispatch();
  const { userToken, allusers, loading } = useSelector((state) => state.auth);
  console.log(allusers);

  useEffect(() => {
    dispatch(handleAllUsers(userToken));
  }, [dispatch, userToken]);

  const guessUsername = (role) => {
    let userName = "";
    switch (role) {
      case 0:
        userName = "User";
        break;
      case 2:
        userName = "Customer";
        break;

      default:
        userName = "User";
        break;
    }
    return userName;
  };

  // const handleAdmin = (email) => {
  //   dispatch(handleMakeAdmin({ token: userToken, email }));
  // };
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {loading ? (
                <GetdataLoader />
              ) : (
                <>
                  {allusers?.length > 0 ? (
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Created At</th>
                          {/* <th>Make Admin</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {allusers &&
                          allusers?.length > 0 &&
                          allusers?.map((user, indx) => {
                            const { name, email, role, createdAt } = user;
                            return (
                              <>
                                <tr key={indx + 1}>
                                  <td>{indx + 1}</td>
                                  <td>{name}</td>
                                  <td>{email}</td>
                                  <td>{guessUsername(role)}</td>
                                  <td>{createdAt}</td>
                                  {/* <td className="position-relative">
                              <button
                                className="btn btn-primary adminbtn"
                                onClick={() => handleAdmin(email)}
                              >
                                <RiAdminFill />
                              </button>
                            </td> */}
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Category found</p>
                  )}
                </>
              )}

              {/* End Table with stripped rows */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alluser;
