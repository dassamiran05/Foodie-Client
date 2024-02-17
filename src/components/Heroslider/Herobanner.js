import React, { useState } from "react";
import img1 from "../../assets/img/hero-1.jpg";
import img2 from "../../assets/img/hero-2.jpg";
import img3 from "../../assets/img/hero-3.jpg";
import img4 from "../../assets/img/hero-4.jpg";
import pizze from "../../assets/img/pizze-img.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";

const banContent = [
  {
    id: 1,
    mediumTitle: "The Perfect Space to Enjoy Fantastic Food",
    largeTitle: "",
    desc: "Festive dining at Farthings where we are strong believers in using the very best produce",
    video: true,
    image: img1,
    btnurl: "/menu",
  },
  {
    id: 2,
    mediumTitle: "grilled cheese",
    largeTitle: "burger",
    desc: "limited time offer",
    image: img2,
    btnurl: "/",
  },
  {
    id: 3,
    mediumTitle: "delicious",
    largeTitle: "Hot Pizza",
    desc: "don't miss this deal",
    image: img3,
    btnurl: "/",
  },
  {
    id: 4,
    mediumTitle: "Summer Drink",
    largeTitle: "Cocktail",
    desc: "limited time offer",
    image: img4,
    btnurl: "/",
  },
];

const VideoPopup = ({ show, setShow }) => {
  const hidePopup = () => {
    setShow(false);
  };
  // console.log(show);
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=hFvlzosXvlI`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </div>
    </div>
  );
};

const Herobanner = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className="slider-hero">
        <div className="slider-home-1">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            slidesPerView={1}
            pagination={{ clickable: true }}
            spaceBetween={30}
            centeredSlides={true}
            className="mySwiper"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {banContent.map((item, index) => {
              return (
                <>
                  <SwiperSlide key={index + 1}>
                    <div
                      className="hero-section item"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <div className="container">
                        <div className="row align-items-end">
                          <div className="col-xl-6">
                            <div className="featured-area">
                              <h2>{item.mediumTitle}</h2>
                              {item?.largeTitle && <h1>{item?.largeTitle}</h1>}

                              {item.video ? (
                                <h5>{item.desc}</h5>
                              ) : (
                                <h6>{item.desc}</h6>
                              )}
                              <div className="d-md-flex align-items-center">
                                <Link to={item.btnurl} className="button">
                                  {item.video
                                    ? "See Our Menus"
                                    : "get offer today"}
                                </Link>
                                {item.video && (
                                  <div
                                    className="video popupvideo"
                                    onClick={() => {
                                      setShow(true);
                                    }}
                                  >
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
                                      </svg>{" "}
                                    </i>
                                    Watch Video
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        </div>
        <div className="weekly-special">
          <span>Weekly Special</span>
          <div>
            <h4>
              <sup>$</sup>90.85
            </h4>
            <h5>Sicilian Pizza</h5>
            <ul className="star">
              {[...Array(5)].map((_) => (
                <li style={{ marginRight: "5px" }}>
                  <FaStar />
                </li>
              ))}
            </ul>
          </div>
          <img alt="Pizza" src={pizze} />
        </div>
      </section>
      <VideoPopup show={show} setShow={setShow} />
    </>
  );
};

export default Herobanner;
