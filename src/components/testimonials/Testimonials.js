import React from "react";
import bratlee1 from "../../assets/img/bratlee-hamint-1.jpg";
import bratlee2 from "../../assets/img/bratlee-hamint-2.jpg";
import bratlee3 from "../../assets/img/bratlee-hamint-3.jpg";
import quote from "../../assets/img/quote.png";
import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <section className="gap" style={{ backgroundColor: "rgb(245, 248, 253)" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="heading">
              <span>Testimonials &amp; Reviews</span>
              <h2>Our Customar Feedbacks</h2>
            </div>
            <div className="bratlee-slider">
              <Swiper
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                // effect="fade"
                slidesPerView={1}
                // pagination={{ clickable: true }}
                showsPagination={false}
                spaceBetween={30}
                centeredSlides={true}
                className="mySwiper"
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {[...Array(4)].map((_) => (
                  <SwiperSlide>
                    <div className="bratlee-hamint item">
                      <p>
                        A good restaurant is like a vacation; it transports you,
                        and it becomes a lot more than just about the food. All
                        great deeds and all great thoughts
                      </p>
                      <div className="d-flex align-items-center mt-4">
                        <h3>Bratlee Hamint</h3>
                        <ul className="star">
                          {[...Array(5)].map((_) => (
                            <li className="test">
                              <FaStar />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <img alt="quote" className="quote" src={quote} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="bratlee-img">
              <img
                alt="bratlee-hamin2"
                className="bratlee-hamint-2"
                src={bratlee2}
              />
              <img
                alt="bratlee-hamint"
                className="bratlee-hamint-1"
                src={bratlee1}
              />
              <img
                alt="bratlee-hamin3"
                className="bratlee-hamint-3"
                src={bratlee3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
