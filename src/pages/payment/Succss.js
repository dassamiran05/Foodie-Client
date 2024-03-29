import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetCart,
  resetCouponApplied,
} from "../../redux/features/cart/cartSlice";
import { resetcoupon } from "../../redux/features/admin/coupon/couponSlice";

const Succss = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCouponApplied());
    dispatch(resetCart());
    dispatch(resetcoupon());
  }, [dispatch]);

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {/* <div>
          <div className="mb-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-success"
              width={75}
              height={75}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1>Payment Success !</h1>
            <p>Lorem ipsum dolor sit</p>
            <button className="btn btn-primary">Back Home</button>
          </div>
        </div> */}
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <div className="box login" style={{ background: "#e9e3e3" }}>
                <div>
                  <div className="mb-4 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-success"
                      width={75}
                      height={75}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3>Thank you for your order !</h3>
                    <p>We will shortly getback to you</p>
                    <Link to="/" className="button lgon mt-2">
                      Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Succss;
