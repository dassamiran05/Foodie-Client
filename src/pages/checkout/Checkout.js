import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import {
  // addPaymentSessionid,
  addshipping,
} from "../../redux/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Banner from "../../components/pageBanner/Banner";
import usePathname from "../../utils/usePathname";
// import Select from "react-select";

const CustomField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mb-3">
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
    </>
  );
};
const CustomTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mb-3">
        <textarea
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
    </>
  );
};

// const CustomSelect = ({ ...props }) => {
//   const [field, meta] = useField(props);
//   console.log(field, meta, props);

//   return (
//     <>
//       <div className="mb-3">
//         <select
//           {...field}
//           {...props}
//           className={`nice-select Advice country_to_state ${
//             meta.touched && meta.error ? "input-error" : ""
//           }`}
//         />
//         {meta.touched && meta.error && (
//           <div className="text-danger">{meta.error}</div>
//         )}
//       </div>
//     </>
//   );
// };

const Checkout = () => {
  const { totalprice, shipping, final, cart } = useSelector(
    (state) => state.cart
  );
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const { activatecoupon } = useSelector((state) => state.coupon);
  const countrydata = Country.getAllCountries();
  const [statedata, setStatedata] = useState([]);
  const [citydata, setCityData] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [selectedOption, setSelectedOption] = useState("stripe_payment");
  // const [sessionid, setSessionId] = useState(null);
  // const [shipping, setShipping] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = usePathname();

  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  console.log("Country", country);
  console.log("state", state);
  console.log("city", city);

  useEffect(() => {
    setStatedata(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state, country]);

  // useEffect(() => {
  //   statedata && setState(statedata[0]);
  // }, [statedata]);

  // useEffect(() => {
  //   citydata && setCity(citydata[0]);
  // }, [citydata]);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [navigate, cart]);

  useEffect(() => {
    selectedOption === "cash_on_delivery"
      ? dispatch(addshipping({ amount: 15, type: "cod" }))
      : dispatch(addshipping({ type: "stripe" }));
  }, [dispatch, selectedOption]);

  const paymentsInputs = [
    {
      id: 1,
      inputId: "stripe_payment",
      name: "stripe_payment",
      defaultValue: "stripe_payment",
      title: "Stripe Payment",
    },
    {
      id: 2,
      inputId: "Cash_on_Delivery",
      name: "COD",
      defaultValue: "cash_on_delivery",
      title: "Cash on Delivery",
    },
  ];

  // useEffect(() => {
  //   dispatch(addPaymentSessionid(sessionid));
  // }, [sessionid]);

  const intval = {
    billing_name: "",
    billing_email: userInfo.email,
    billing_country: "",
    billing_state: "",
    billing_city: "",
    Postal_Code: "",
    billing_phone: "",
    billing_address: "",
    order_comments: "",
  };

  const onValueChange = (value) => {
    setSelectedOption(value);
    console.log(paymentsInputs.find((item) => item.defaultValue === value));
  };

  const handleInputChange = (e) => {
    const selectedCountry = countrydata.find(
      (item) => item.name === e.target.value
    );
    setCountry(selectedCountry);
  };

  const handleStateInputChange = (e) => {
    const selectedState = statedata.find(
      (item) => item.name === e.target.value
    );
    setState(selectedState);
  };

  const handleCityInputChange = (e) => {
    const selectedCity = citydata.find((item) => item.name === e.target.value);
    setCity(selectedCity);
  };

  const handledropdowndata = (dropdownData) => {
    return dropdownData.map((item) => item.name);
  };

  const makepayment = async (info) => {
    const { buyerData, products, paymentprice } = info;
    console.log(buyerData, products, paymentprice);
    try {
      if (selectedOption === "stripe_payment") {
        const apiKey = `${process.env.REACT_APP_PUBLISHABLE_KEY}`;
        const stripe = await loadStripe(apiKey);

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
        };

        const { data } = await axiosInstance.post(
          `/api/v1/product/create-payment`,
          { ...info, coupon: activatecoupon },
          config
        );

        if (data && data.id) {
          const result = stripe.redirectToCheckout({
            sessionId: data.id,
          });

          if (result.error) {
            console.error("Error redirecting to Checkout:", result.error);
          }
        }
      }
    } catch (error) {
      console.error("Error creating Checkout Session:", error);
    }
  };

  return (
    <>
      <Loader />
      <div>
        <Banner paths={pathArr} />
        <section className="gap">
          <div className="container">
            <Formik
              // enableReinitialize={true}
              initialValues={intval}
              validationSchema={Yup.object({
                billing_name: Yup.string()
                  .trim()
                  .required("Required")
                  .matches(/^[A-Za-z ]+$/, "Only letters required"),
                billing_address: Yup.string().required("Required"),
                billing_country: Yup.string()
                  .required("Required")
                  .oneOf(handledropdowndata(countrydata), "Not Exists"),
                billing_state: Yup.string()
                  .oneOf(handledropdowndata(statedata), "Not Exists")
                  .required("Required"),
                billing_city: Yup.string()
                  .oneOf(handledropdowndata(citydata), "Not Exists")
                  .required("Required"),
                Postal_Code: Yup.string()
                  .required("Required")
                  .matches(/^[0-9]+$/, "Only number"),
                billing_phone: Yup.string()
                  .required("Required")
                  .matches(
                    /^[6-9]/,
                    "Number should start with 6 or 7 or 8 or 9"
                  )
                  .matches(/^[0-9]+$/, "Only number")
                  .matches(/^[0-9]{10}$/, "Length should be 10"),
              })}
              onSubmit={(values, actions) => {
                console.log({
                  ...values,
                  paymentprice: final ? final : totalprice,
                });

                if (selectedOption === "stripe_payment") {
                  const timer = setTimeout(() => {
                    makepayment({
                      buyerData: values,
                      products: cart,
                      paymentprice: final ? final : totalprice,
                    });
                  }, 500);

                  return () => clearTimeout(timer);
                } else {
                  alert("This is cash on delivery!!");
                }
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
                  <Form className="checkout-meta donate-page">
                    <div className="row">
                      <div className="col-lg-8">
                        <h3 className="pb-3">Billing details</h3>
                        <div className="col-lg-12">
                          <CustomField
                            type="text"
                            name="billing_name"
                            placeholder="Billing Name"
                          />
                          <CustomField
                            name="billing_email"
                            type="email"
                            placeholder="Email address"
                            disabled
                            defaultValue={userInfo.email}
                          />
                          {/* <CustomSelect
                            name="billing_country"
                            onChange={handleInputChange}
                          >
                            <option value="" disabled selected>
                              Select Country
                            </option>
                            {countrydata.map((item, indx) => {
                              return (
                                <>
                                  <option value={item?.name} key={indx + 1}>
                                    {item?.name}
                                  </option>
                                </>
                              );
                            })}
                          </CustomSelect> */}
                          <div className="mb-3">
                            <select
                              name="billing_country"
                              onChange={(e) => {
                                handleInputChange(e);
                                setFieldValue(
                                  "billing_country",
                                  e.target.value
                                );
                              }}
                              className={`nice-select Advice country_to_state ${
                                touched.billing_country &&
                                errors.billing_country
                                  ? "input-error"
                                  : ""
                              }`}
                            >
                              <option value="" disabled selected>
                                Select Country
                              </option>
                              {countrydata.map((item, indx) => {
                                return (
                                  <>
                                    <option value={item?.name} key={indx + 1}>
                                      {item?.name}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                            {touched.billing_country &&
                              errors.billing_country && (
                                <div className="text-danger">
                                  {errors.billing_country}
                                </div>
                              )}
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              {/* <CustomSelect name="billing_state">
                                <option value="" disabled selected>
                                  Select State
                                </option>
                                {statedata.map((item, indx) => {
                                  return (
                                    <>
                                      <option value={item?.name} key={indx + 1}>
                                        {item?.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </CustomSelect> */}
                              <div className="mb-3">
                                <select
                                  name="billing_state"
                                  // onChange={handleStateInputChange}
                                  onChange={(e) => {
                                    handleStateInputChange(e);
                                    setFieldValue(
                                      "billing_state",
                                      e.target.value
                                    );
                                  }}
                                  className={`nice-select Advice country_to_state ${
                                    touched.billing_state &&
                                    errors.billing_state
                                      ? "input-error"
                                      : ""
                                  }`}
                                  disabled={!country ? true : false}
                                >
                                  <option value="" disabled selected>
                                    Select State
                                  </option>
                                  {statedata.map((item, indx) => {
                                    return (
                                      <>
                                        <option
                                          value={item?.name}
                                          key={indx + 1}
                                        >
                                          {item?.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                                {touched.billing_state &&
                                  errors.billing_state && (
                                    <div className="text-danger">
                                      {errors.billing_state}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              {/* <CustomSelect name="billing_city">
                                <option value="" disabled selected>
                                  Select City
                                </option>
                                {citydata.map((item, indx) => {
                                  return (
                                    <>
                                      <option value={item?.name} key={indx + 1}>
                                        {item?.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </CustomSelect> */}
                              <div className="mb-3">
                                <select
                                  name="billing_city"
                                  // onChange={handleCityInputChange}
                                  onChange={(e) => {
                                    handleCityInputChange(e);
                                    setFieldValue(
                                      "billing_city",
                                      e.target.value
                                    );
                                  }}
                                  className={`nice-select Advice country_to_state ${
                                    touched.billing_city && errors.billing_city
                                      ? "input-error"
                                      : ""
                                  }`}
                                  disabled={!state ? true : false}
                                >
                                  <option value="" disabled selected>
                                    Select City
                                  </option>
                                  {citydata.map((item, indx) => {
                                    return (
                                      <>
                                        <option
                                          value={item?.name}
                                          key={indx + 1}
                                        >
                                          {item?.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                                {touched.billing_city &&
                                  errors.billing_city && (
                                    <div className="text-danger">
                                      {errors.billing_city}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <CustomField
                                name="Postal_Code"
                                type="text"
                                placeholder="Postal Code"
                              />
                            </div>
                            <div className="col-lg-6">
                              <CustomField
                                name="billing_phone"
                                type="tel"
                                placeholder="Phone"
                              />
                            </div>
                          </div>
                          <CustomField
                            name="billing_address"
                            type="text"
                            placeholder="billing address"
                          />
                          <div className="ship-address">
                            <div className="d-flex">
                              <input
                                type="radio"
                                id="ShipAddress"
                                name="Create"
                                defaultValue="ShipAddress"
                              />
                              <label
                                htmlFor="ShipAddress"
                                className="shiplabel"
                              >
                                Ship to same Address
                              </label>
                            </div>
                          </div>
                          <CustomTextarea
                            name="order_comments"
                            placeholder="Order Note"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div
                          className="cart_totals-checkout"
                          style={{
                            backgroundImage: `url(${require("../../assets/img/patron.jpg")})`,
                          }}
                        >
                          <div className="cart_totals cart-Total">
                            <h4>Cart Total</h4>
                            <table className="shop_table_responsive">
                              <tbody>
                                <tr className="cart-subtotal">
                                  <th>Subtotal:</th>
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
                                      {shipping ? `$${shipping}` : "Free"}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="Total">
                                  <th style={{ color: "#fff" }}>Total:</th>
                                  <td style={{ color: "#fff" }}>
                                    <span className="woocommerce-Price-amount">
                                      <bdi>
                                        <span>$</span>
                                        {shipping ? final : totalprice}
                                      </bdi>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="checkout-side">
                            <h3 style={{ color: "#fff" }}>Payment Method</h3>
                            <ul>
                              {paymentsInputs.map((inpt, index) => {
                                return (
                                  <>
                                    <li key={index + 1}>
                                      <input
                                        type="radio"
                                        id={inpt.inputId}
                                        name={inpt.name}
                                        defaultValue={inpt.defaultValue}
                                        checked={
                                          selectedOption === inpt.defaultValue
                                        }
                                        onChange={() =>
                                          onValueChange(inpt.defaultValue)
                                        }
                                      />
                                      <label htmlFor={inpt.inputId}>
                                        {inpt.title}
                                      </label>
                                    </li>
                                  </>
                                );
                              })}
                              {/* <li>
                                <input
                                  type="radio"
                                  id="stripe_payment"
                                  name="stripe_payment"
                                  defaultValue="stripe_payment"
                                  checked={selectedOption === "stripe_payment"}
                                  onChange={onValueChange}
                                />
                                <label htmlFor="stripe_payment">
                                  Stripe payment
                                </label>
                              </li>
                              <li>
                                <input
                                  type="radio"
                                  id="Cash_on_Delivery"
                                  name="COD"
                                  defaultValue="Check_Payment"
                                  checked={selectedOption === "Check_Payment"}
                                  onChange={onValueChange}
                                />
                                <label htmlFor="Cash_on_Delivery">
                                  Cash on Delivery
                                </label>
                              </li> */}
                            </ul>
                            <button type="submit" className="button">
                              <span>
                                {selectedOption === "stripe_payment"
                                  ? "Proceed"
                                  : "Place Order"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
