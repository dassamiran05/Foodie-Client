import React, { useEffect, useState } from "react";

import tick from "../../assets/img/check.png";
import dealWeek from "../../assets/img/deal-week.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculateTotalprice } from "../../redux/features/cart/cartSlice";

const Deal = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { featuredProducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    const countDownDate = new Date("Oct 5, 2024 15:37:25").getTime();
    const interval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      // }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="gap">
      <div className="container">
        <div className="heading-two">
          <h2>Deal of the Week</h2>
          <div className="line" />
        </div>
        <div className="row align-items-center">
          <div className="col-xl-5">
            <div className="deal-week">
              <span>Sale up to 7% off</span>
              <h2>Chicken and Vegetable Stir-Fry</h2>
              <ul className="quality-foods">
                <li>
                  <img alt="img" src={tick} />
                  <h6>Fresh &amp; Tasty</h6>
                </li>
                <li>
                  <img alt="img" src={tick} />
                  <h6>Best in organic foods</h6>
                </li>
                <li>
                  <img alt="img" src={tick} />
                  <h6>100 Fresh Ingredients</h6>
                </li>
                <li>
                  <img alt="img" src={tick} />
                  <h6>Better for your Health</h6>
                </li>
              </ul>
              <div className="mb-4 d-flex align-items-center">
                <h2 className="m-0">
                  <span>$</span>10.85
                </h2>
                <del>$14.85</del>
              </div>
              <button
                onClick={() => {
                  dispatch(addToCart(featuredProducts[0]));
                  dispatch(calculateTotalprice());
                }}
                className="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="deal-week-time">
              <img alt="deal-week" src={dealWeek} />
              <div id="countdown">
                <ul>
                  <li>
                    <span id="days">{days}</span>
                    Days
                  </li>
                  <li>
                    <span id="hours">{hours}</span>
                    Hours
                  </li>
                  <li>
                    <span id="minutes">{minutes}</span>
                    Min
                  </li>
                  <li className="mb-0">
                    <span id="seconds">{seconds}</span>
                    Secs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deal;
