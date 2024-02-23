import React, { useEffect, useState } from "react";
import check from "../../assets/img/check.png";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSingleProduct } from "../../redux/features/admin/product/productActions";
import { resetSingleproductState } from "../../redux/features/admin/product/productSlice";
import {
  addToCart,
  calculateTotalprice,
} from "../../redux/features/cart/cartSlice";
import "./productdetails.css";
import { initializeReviewsFromProduct } from "../../redux/features/review/reviewSlice";
import { handleAddReview } from "../../redux/features/review/reviewActions";
import Loader from "../../components/loader/Loader";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const { review } = useSelector((state) => state.review);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const { singleproduct } = useSelector((state) => state.product);

  const pathname = usePathname();

  // const pathArr = pathname
  //   .split("/")
  //   .filter((path) => path !== "")
  //   .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  const pathArr = ["Product Details"];

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  useEffect(() => {
    dispatch(handleSingleProduct(id));

    return () => {
      dispatch(resetSingleproductState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(initializeReviewsFromProduct(singleproduct?.rating));
  }, [dispatch, singleproduct?.rating]);

  const handleAddtocart = (product) => {
    const {
      slug,
      description,
      sold,
      category,
      shipping,
      rating,
      createdAt,
      updatedAt,
      photourl,
      __v,
      ...newOne
    } = product;

    const timer = setTimeout(() => {
      dispatch(addToCart(newOne));
      dispatch(calculateTotalprice());
    }, 500);

    return () => clearTimeout(timer);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const handlemousemove = (index) => {
    setHover(index);
  };

  const handlemouseleave = () => {
    setHover(rating);
  };

  const handleReview = (e) => {
    e.preventDefault();
    const reviewData = {
      rating: rating,
      review: reviewInput,
      username: userInfo?.name,
      useremail: userInfo?.email,
      datewithtime: new Date().toISOString(),
    };
    console.log(reviewData, new Date(), new Date().toISOString());

    if (reviewData && id && userToken) {
      dispatch(
        handleAddReview({
          payload: reviewData,
          productId: id,
          token: userToken,
        })
      );
    }
    dispatch(initializeReviewsFromProduct(singleproduct?.rating));
    setReviewInput("");
    setHover(0);
    setRating(0);
  };

  return (
    <>
      <Loader />
      <div>
        {/* <section
          className="banner"
          style={{
            backgroundImage: `url(${require("../../assets/img/background.png")})`,
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="title-area-data">
                  <h2>Product Details</h2>
                  <p>
                    A magical combination that sent aromas to the taste buds
                  </p>
                </div>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="fa-solid fa-house" /> Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Product Details
                  </li>
                </ol>
              </div>
              <div className="col-lg-5">
                <div className="row">
                  <div className="col-6">
                    <div className="title-area-img">
                      <img
                        alt="title-area-img"
                        src={require("../../assets/img/title-area-img-1.jpg")}
                      />
                      <img
                        alt="pata"
                        className="pata"
                        src={require("../../assets/img/pata.png")}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="title-area-img two">
                      <img
                        alt="title-area-img"
                        src={require("../../assets/img/title-area-img-2.jpg")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <Banner paths={pathArr} />
        <section className="gap featured-dishes-product-detail-img">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6">
                <div className="featured-dishes product-detail-img">
                  <div className="sale">
                    <h6>Sale</h6>
                  </div>
                  <div className="featured-dishes-img">
                    <img
                      alt="featured-dishes"
                      // src={require("../../assets/img/product-detail-1.png")}
                      src={singleproduct.photo}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="available">
                  <span>
                    <i className="fa-solid fa-check" />
                    {singleproduct.quantity > 0 ? "available" : "Not available"}
                  </span>
                  <ul className="star">
                    {[...Array(5)].map((_) => (
                      <li className="prductDet">
                        <FaStar
                          style={{
                            width: "18px",
                            height: "18px",
                            marginRight: "3px",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <h6>( 1 Review )</h6>
                </div>
                <div className="product-info ">
                  <h3>{singleproduct.name}</h3>
                  <form className="variations_form">
                    <div className="deal-week mb-4 d-flex align-items-center">
                      <h2 className="m-0">
                        <span>$</span>
                        {singleproduct.price}
                      </h2>
                      <del>${singleproduct.regularPrice}</del>
                    </div>
                    <h5>What’s Included</h5>
                    <p>
                      Sausage, three rashers of streaky bacon, two fried eggs
                    </p>
                    <div className="d-flex align-items-center mt-4">
                      <input
                        type="number"
                        className="input-text me-4"
                        step={1}
                        min={1}
                        name="quantity"
                        defaultValue={1}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button
                        className="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddtocart({
                            ...singleproduct,
                            cartQuantity: Number(quantity),
                          });
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <ul className="product_meta">
                      <li>
                        <span className="theme-bg-clr">Category:</span>
                        <ul className="pd-tag">
                          <li>
                            <Link to="#" className="ps-0">
                              {singleproduct?.category?.name}
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="about-chef">
          <div className="container">
            <h2 className="pb-3">Description</h2>
            <p>{singleproduct.description}</p>
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div className="product-img">
                  <img
                    alt="product-img"
                    src={require("../../assets/img/product-2.jpg")}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-img">
                  <img
                    alt="product-img"
                    src={require("../../assets/img/product-3.jpg")}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="product-img">
                  <img
                    alt="product-img"
                    src={require("../../assets/img/product-4.jpg")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="benefits">
              <div>
                <h2 className="pb-3">Benefits</h2>
                <ul className="quality-foods">
                  <li>
                    <img alt="img" src={check} />
                    <h6>Quality foods natural gradient</h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>A melting pot of cheese served with our Little Soul</h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>Award-winning Restaurant</h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>caramelised balsamic onions</h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>Healthy Food 100% Organic Food</h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>
                      roasted on a skewer, hanging above a spicy chilli seafood
                    </h6>
                  </li>
                  <li>
                    <img alt="img" src={check} />
                    <h6>individually styled bedrooms</h6>
                  </li>
                </ul>
              </div>
              <div className="benefit-img">
                <img
                  alt="benefit"
                  src={require("../../assets/img/benefit.png")}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="gap no-top">
          <div className="container">
            <div className="review">
              {review?.length > 0 && <h3>Review</h3>}

              {review &&
                review?.length > 0 &&
                review?.map((item) => {
                  return (
                    <>
                      <div className="single-comment">
                        <img
                          alt="img"
                          src={require("../../assets/img/review.jpg")}
                        />
                        <div className="ps-md-4">
                          <div className="d-flex align-items-center">
                            <h4>{item.username}</h4>
                            <span>{item.datewithtime}</span>
                          </div>

                          <p>{item.review}</p>
                          <ul className="star">
                            {[...Array(5)].map((_, indx) => {
                              indx += 1;
                              return (
                                <>
                                  <FaStar
                                    className={
                                      indx <= item.rating
                                        ? "activecls"
                                        : "inactive"
                                    }
                                    // onClick={() => handleClick(indx)}
                                    // onMouseMove={() => handlemousemove(indx)}
                                    // onMouseLeave={handlemouseleave}
                                  />
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                })}
              <form className="add-review leave-comment">
                <div className="rating">
                  <h3>Add Review</h3>
                  <div className="d-flex align-items-center">
                    <span>Your Rating</span>
                    <div className="start d-flex align-items-center ps-md-4 gap-1">
                      {[...Array(5)].map((_, indx) => {
                        indx += 1;
                        return (
                          <FaStar
                            className={
                              indx <= (rating || hover) ? "active" : "inactive"
                            }
                            onClick={() => handleClick(indx)}
                            onMouseMove={() => handlemousemove(indx)}
                            onMouseLeave={handlemouseleave}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <textarea
                    placeholder="Add Review"
                    // defaultValue={""}
                    name="review"
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                  />

                  <button className="button" onClick={handleReview}>
                    <span>Post Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
