import React, { useEffect } from "react";
import { CartIcon } from "../svgIcons/Svgicons";
// import feature1 from "../../assets/img/featured-dishes-1.png";
// import feature2 from "../../assets/img/featured-dishes-2.png";
// import feature3 from "../../assets/img/featured-dishes-3.png";
// import feature4 from "../../assets/img/featured-dishes-2.png";
import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeaturedProducts } from "../../redux/features/admin/product/productActions";
import { Link } from "react-router-dom";
import {
  addToCart,
  calculateTotalprice,
} from "../../redux/features/cart/cartSlice";

const Shopsection = () => {
  const { featuredProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeaturedProducts());
  }, [dispatch]);

  const handleAddtoCart = (item) => {
    const { regularPrice, rating, featured, ...newObj } = item;
    dispatch(addToCart(newObj));
    dispatch(calculateTotalprice());
  };
  return (
    <>
      <section
        className="gap section-featured"
        style={{ backgroundColor: "#f5f8fd" }}
      >
        <div className="container">
          <div className="heading-two">
            <h2>Featured Dishes</h2>
            <div className="line" />
          </div>
          <div className="row dishes">
            <Swiper
              modules={[Navigation, Pagination, EffectFade, Autoplay]}
              // effect="fade"
              slidesPerView={3}
              pagination={{
                type: "bullets",
                bulletClass: "swiper-shop-bullet",
                bulletActiveClass: "swiper-custom-bullet-active",
                clickable: true,
              }}
              breakpoints={{
                1076: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                350: { slidesPerView: 1 },
              }}
              spaceBetween={30}
              centeredSlides={true}
              className="mySwiper"
              loop={true}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
            >
              {featuredProducts &&
                featuredProducts.length > 0 &&
                featuredProducts.map((product, index) => {
                  return (
                    <>
                      <SwiperSlide>
                        <div className="item col-xl-12">
                          <div className="featured-dishes">
                            <div className="sale">
                              <h6>Sale</h6>
                            </div>
                            <div className="featured-dishes-img">
                              <img alt="featured-dishes" src={product.photo} />
                            </div>
                            <ul className="star">
                              {[...Array(5)].map((_) => (
                                <FaStar />
                              ))}
                            </ul>
                            <Link to={`/productdetail/${product._id}`}>
                              <h5>{product.name}</h5>
                            </Link>
                            <div className="d-flex">
                              <p>
                                <span>$</span>
                                {product.price}
                              </p>
                              <del>${product.regularPrice}</del>
                            </div>
                            <button onClick={() => handleAddtoCart(product)}>
                              <i className="feature">
                                <CartIcon />
                              </i>
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shopsection;
