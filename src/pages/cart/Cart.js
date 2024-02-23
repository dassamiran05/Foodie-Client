import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  calculateTotalprice,
  removeItemfromCart,
  updateCart,
} from "../../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getActivateCoupon } from "../../redux/features/admin/coupon/couponActions";
import { handleCouponverify } from "../../redux/features/cart/cartActions";
import {
  // resetcoupon,
  setActivatecoupon,
} from "../../redux/features/admin/coupon/couponSlice";
import Loader from "../../components/loader/Loader";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";
import {
  startLoading,
  stopLoading,
} from "../../redux/features/globalLoader/loaderSlice";

const Cart = () => {
  const { cart, totalprice, iscouponApplied } = useSelector(
    (state) => state.cart
  );
  const { userToken } = useSelector((state) => state.auth);
  const { coupon } = useSelector((state) => state.coupon);
  const { isLoading: loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);
  const [couponInput, setCouponinput] = useState("");
  const [activestat, setActiveStat] = useState(true);
  // const [customloading, setCustomLoading] = useState(false);

  const pathname = usePathname();
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  useEffect(() => {
    if (!iscouponApplied) {
      dispatch(calculateTotalprice());
    }
  }, [dispatch, iscouponApplied]);

  useEffect(() => {
    if (!iscouponApplied) {
      if (totalprice >= 150) {
        dispatch(getActivateCoupon({ totalprice: totalprice }));
      }
    }
  }, [dispatch, totalprice, iscouponApplied]);

  const handlecartQuantity = (_id, qtn) => {
    // dispatch(addToCart(product));
    console.log(_id, qtn);
    const exists = values.find((val) => val._id === _id);
    let newvals = [];
    if (exists) {
      newvals = values.map((item) => {
        if (item._id === _id) {
          return { ...item, cartQuantity: qtn };
        } else {
          return item;
        }
      });
    } else {
      newvals = [...values, { _id, cartQuantity: qtn }];
    }

    setValues(newvals);
  };

  const handleUpdateCart = (e) => {
    e.preventDefault();
    if (values.length === 0) {
      toast.success("Please change something to update!");
    } else {
      const timer = setTimeout(() => {
        dispatch(updateCart(values));
        dispatch(calculateTotalprice());
        setValues([]);
      }, 500);

      return () => clearTimeout(timer);
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }

  const handleCouponClick = () => {
    // setCustomLoading(true);
    dispatch(startLoading());
    dispatch(setActivatecoupon(coupon));
    setTimeout(() => {
      dispatch(
        handleCouponverify({
          coupon: couponInput,
          total: totalprice,
          token: userToken,
        })
      ).then((data) => {
        if (data.payload.success) {
          // dispatch(resetcoupon());
          setActiveStat(false);
        }
        // setCustomLoading(false);
        dispatch(stopLoading());
      });
    }, 2500);
  };

  return (
    <>
      <Loader />
      <div>
        <Banner paths={pathArr} />
        <section className="gap">
          <div className="container">
            <form className="woocommerce-cart-form">
              <div style={{ overflowX: "auto", overflowY: "hidden" }}>
                <table className="shop_table table-responsive">
                  <thead>
                    <tr>
                      <th className="product-name">Action</th>
                      <th className="product-name">Product</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-quantity">Price</th>
                      <th className="product-subtotal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      <>
                        {cart.map((item, index) => {
                          const { name, photo, cartQuantity, price, _id } =
                            item;
                          return (
                            <>
                              <tr key={index + 1}>
                                <td className="fs-4 text-danger">
                                  <span
                                    onClick={() => {
                                      dispatch(removeItemfromCart(_id));
                                      dispatch(calculateTotalprice());
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <RiDeleteBin6Line />
                                  </span>
                                </td>
                                <td className="product-name">
                                  <div
                                    style={{ width: "200px", height: "150px" }}
                                  >
                                    <img
                                      alt={name}
                                      src={photo}
                                      className="w-100 h-100 object-fit-contain"
                                    />
                                  </div>

                                  <div>
                                    <Link to={`/productdetail/${_id}`}>
                                      {name}
                                    </Link>
                                    <span>
                                      Sausage, three rashers of streaky bacon
                                    </span>
                                  </div>
                                </td>
                                <td className="product-quantity">
                                  <input
                                    type="number"
                                    className="input-text"
                                    defaultValue={cartQuantity}
                                    onChange={(e) =>
                                      handlecartQuantity(
                                        _id,
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </td>
                                <td className="product-subtotal">
                                  <span className="woocommerce-Price-amount">
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {price}
                                    </bdi>
                                  </span>
                                </td>
                                <td className="product-subtotal">
                                  <span className="woocommerce-Price-amount">
                                    <bdi>
                                      <span className="woocommerce-Price-currencySymbol">
                                        $
                                      </span>
                                      {price * cartQuantity}
                                    </bdi>
                                  </span>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div className="w-100 d-flex flex-column justify-content-center gap-3 p-5">
                        <span>The cart is empty</span>
                        <Link
                          to="/products"
                          className="button"
                          style={{ width: "150px" }}
                        >
                          Shop now
                        </Link>
                      </div>
                    )}
                  </tbody>
                  {cart.length > 0 && (
                    <tfoot>
                      <tr className="coupon">
                        <td colSpan={5}>
                          <div className="d-flex align-items-center justify-content-end">
                            <button
                              name="update_cart"
                              className="update-cart"
                              onClick={handleUpdateCart}
                              disabled={activestat ? false : true}
                            >
                              Update Cart
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
              {cart.length > 0 && (
                <div
                  className={`row mt-5 ${
                    totalprice < 150 ? "" : "d-flex justify-content-end"
                  }`}
                >
                  <div className="col-lg-4">
                    {totalprice >= 150 &&
                      !iscouponApplied &&
                      Object.keys(coupon).length > 0 && (
                        <div className="coupon-area">
                          <h3>Apply Coupon</h3>
                          <div className="coupon">
                            <input
                              type="text"
                              name="coupon_code"
                              className="input-text"
                              placeholder="Coupon Code"
                              onChange={(e) => setCouponinput(e.target.value)}
                            />
                            <button
                              type="submit"
                              name="apply_coupon"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCouponClick();
                              }}
                            >
                              <span>Apply coupon</span>
                            </button>
                            <div className="mt-2 d-flex justify-content-center p-3">
                              <span>
                                Apply coupon <strong>{coupon.name}</strong> to
                                get {coupon.discount}% discount
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className={`col-lg-8`}>
                    <div className="cart_totals">
                      <h4>Cart Totals</h4>
                      <div className="shop_table-boder">
                        <table className="shop_table_responsive">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th>Sub total:</th>
                              <td>
                                <span className="woocommerce-Price-amount">
                                  <bdi>
                                    <span className="woocommerce-Price-currencySymbol">
                                      $
                                    </span>
                                    {totalprice}
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                            <tr className="Shipping">
                              <th>Shipping:</th>
                              <td>
                                <span className="woocommerce-Price-amount amount">
                                  {/* <input
                                    type="number"
                                    className="input-text shipping"
                                    defaultValue={shipping}
                                    onChange={(e) =>
                                      handleShipping(Number(e.target.value))
                                    }
                                  />{" "} */}
                                  Free
                                </span>
                              </td>
                            </tr>
                            <tr className="Total">
                              <th>Total:</th>
                              <td>
                                <span className="woocommerce-Price-amount">
                                  <bdi>
                                    <span>$</span>
                                    {totalprice}
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="wc-proceed-to-checkout">
                        <Link to="/checkout" className="button">
                          <span>Proceed to checkout</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
