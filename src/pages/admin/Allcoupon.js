import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  handleDeleteCoupon,
} from "../../redux/features/admin/coupon/couponActions";
import { RiDeleteBin6Line } from "react-icons/ri";
import GetdataLoader from "./shared/GetdataLoader";

const Allcoupon = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { coupons, loading } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(getCoupons({ accessToken: userToken }));
  }, [dispatch, userToken]);

  const handleClick = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(handleDeleteCoupon({ id, token: userToken }));
    }
  };
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
                  {coupons?.length > 0 ? (
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Expiry</th>
                          <th>Max limit price</th>
                          <th>Discount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons &&
                          coupons?.length > 0 &&
                          coupons?.map((coupon, indx) => {
                            const {
                              name,
                              expiry,
                              discount,
                              _id,
                              maxlimitprice,
                            } = coupon;
                            return (
                              <>
                                <tr
                                  key={indx + 1}
                                  className={`${coupon.expire ? "expire" : ""}`}
                                >
                                  <td>{indx + 1}</td>
                                  <td>{name}</td>
                                  <td>{expiry}</td>
                                  <td>{maxlimitprice}</td>
                                  <td>{discount}%</td>
                                  <td>
                                    <div className="d-flex gap-1">
                                      <span
                                        className="text-danger fs-4"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleClick(_id)}
                                      >
                                        <RiDeleteBin6Line />
                                      </span>
                                      {/* <Link
                                        to="#"
                                      >
                                        <span
                                          className="text-primary fs-4"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FaRegEdit />
                                        </span>
                                      </Link> */}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Data found</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Allcoupon;
