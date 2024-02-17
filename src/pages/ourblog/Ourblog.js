import React from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Ourblog = () => {
  const pathname = usePathname();
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

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
                  <h2>Our Blog</h2>
                  <p>
                    A magical combination that sent aromas to the taste buds
                  </p>
                </div>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="index.html">
                      <i className="fa-solid fa-house" /> Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    News
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Our Blog
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
        <section className="gap our-blog">
          <div className="container">
            <div className="row">
              <div className="col-xl-8">
                <div className="recent-news-two">
                  <img
                    alt="recent-news-img"
                    src={require("../../assets/img/recent-news-6.jpg")}
                  />
                  <div className="recent-news mt-3">
                    <div>
                      <Link to="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <Link to="blog-details.html">
                        <h2>Tender fried baby squid with a salt, pepper</h2>
                      </Link>
                      <div className="d-flex align-items-center">
                        <img
                          alt="img"
                          className="me-3"
                          src={require("../../assets/img/man.jpg")}
                        />
                        <h6>by Thomas Walimes</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recent-news-two">
                  <img
                    alt="recent-news-img"
                    src={require("../../assets/img/recent-news-7.jpg")}
                  />
                  <div className="recent-news mt-3">
                    <div>
                      <Link to="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <Link to="blog-details.html">
                        <h2>Operates approximately 400 restaurants</h2>
                      </Link>
                      <div className="d-flex align-items-center">
                        <img
                          alt="img"
                          className="me-3"
                          src={require("../../assets/img/man.jpg")}
                        />
                        <h6>by Thomas Walimes</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recent-news-two">
                  <img
                    alt="recent-news-img"
                    src={require("../../assets/img/recent-news-8.jpg")}
                  />
                  <div className="recent-news mt-3">
                    <div>
                      <Link to="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <Link to="blog-details.html">
                        <h2>Eclectic and imaginative menu in the restaurant</h2>
                      </Link>
                      <div className="d-flex align-items-center">
                        <img
                          alt="img"
                          className="me-3"
                          src={require("../../assets/img/man.jpg")}
                        />
                        <h6>by Thomas Walimes</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recent-news-two">
                  <img
                    alt="recent-news-img"
                    src={require("../../assets/img/recent-news-9.jpg")}
                  />
                  <div className="recent-news mt-3">
                    <div>
                      <Link to="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <Link to="blog-details.html">
                        <h2>Menus for your event, inspired equally</h2>
                      </Link>
                      <div className="d-flex align-items-center">
                        <img
                          alt="img"
                          className="me-3"
                          src={require("../../assets/img/man.jpg")}
                        />
                        <h6>by Thomas Walimes</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recent-news-two">
                  <img
                    alt="recent-news-img"
                    src={require("../../assets/img/recent-news-3.jpg")}
                  />
                  <div className="recent-news mt-3">
                    <div>
                      <Link to="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <Link to="blog-details.html">
                        <h2>Flowers, candles and menu cards are provided</h2>
                      </Link>
                      <div className="d-flex align-items-center">
                        <img
                          alt="img"
                          className="me-3"
                          src={require("../../assets/img/man.jpg")}
                        />
                        <h6>by Thomas Walimes</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="pagination">
                  <li className="prev">
                    <Link to="#">
                      <FaAngleDoubleLeft
                        style={{ fill: "#fff", fontSize: "22px" }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">1</Link>
                  </li>
                  <li>
                    <Link to="#">2</Link>
                  </li>
                  <li>
                    <Link to="#">3</Link>
                  </li>
                  <li>
                    <Link to="#">...</Link>
                  </li>
                  <li>
                    <Link to="#">18</Link>
                  </li>
                  <li className="next">
                    <Link to="#">
                      <FaAngleDoubleRight
                        style={{ fill: "#fff", fontSize: "22px" }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xl-4">
                <div className="posts recent-posts">
                  <h3>Recent Posts</h3>
                  <ul>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/recent-news-blog-1.jpg")}
                      />
                      <div>
                        <Link to="#">29 December, 2022</Link>
                        <h6>
                          <Link to="#">
                            Restaurant Located in on Bank Street
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/recent-news-blog-2.jpg")}
                      />
                      <div>
                        <Link to="#">29 December, 2022</Link>
                        <h6>
                          <Link to="#">There’s only one kind of happiness</Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/recent-news-blog-3.jpg")}
                      />
                      <div>
                        <Link to="#">29 December, 2022</Link>
                        <h6>
                          <Link to="#">comes in all shapes and sizes.</Link>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="posts">
                  <h3>Categories</h3>
                  <ul className="categories">
                    <li className="pt-0">
                      <Link to="#">
                        food<span>12</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Inspiration<span>13</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Lifestyle<span>19</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        People<span>22</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Recipes <span>11</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        World<span>08</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="posts Photo">
                  <h3>Instagram Photos</h3>
                  <ul className="instagram-posts">
                    <li>
                      <Link
                        to="assets/img/photo-gallery-1.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-1.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="assets/img/photo-gallery-2.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-2.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="assets/img/photo-gallery-3.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-3.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="assets/img/photo-gallery-4.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-4.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="assets/img/photo-gallery-5.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-5.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="assets/img/photo-gallery-6.jpg"
                        data-fancybox="gallery"
                      >
                        <figure>
                          <img
                            alt="girl"
                            src={require("../../assets/img/photo-gallery-6.jpg")}
                          />
                        </figure>
                      </Link>
                    </li>
                  </ul>
                  <Link to="#">Follow @winsfolio</Link>
                </div>
                <div className="posts">
                  <h3>Trending Dishes</h3>
                  <ul className="trending-dishes-list">
                    <li className="pt-0">
                      <div className="dishes-list-img">
                        <img
                          alt="trending-dishe"
                          src={require("../../assets/img/trending-dishe-1.png")}
                        />
                      </div>
                      <h5>
                        <Link to="#">Rolls with vermicelli &amp; pickle</Link>
                      </h5>
                    </li>
                    <li>
                      <div className="dishes-list-img">
                        <img
                          alt="trending-dishe"
                          src={require("../../assets/img/trending-dishe-2.png")}
                        />
                      </div>
                      <h5>
                        <Link to="#">Spicy salad rolls with enoki</Link>
                      </h5>
                    </li>
                    <li>
                      <div className="dishes-list-img">
                        <img
                          alt="trending-dishe"
                          src={require("../../assets/img/trending-dishe-3.png")}
                        />
                      </div>
                      <h5>
                        <Link to="#">chicken wings served with sriracha</Link>
                      </h5>
                    </li>
                    <li>
                      <div className="dishes-list-img">
                        <img
                          alt="trending-dishe"
                          src={require("../../assets/img/trending-dishe-4.png")}
                        />
                      </div>
                      <h5>
                        <Link to="#">spicy salad rolls with enoki</Link>
                      </h5>
                    </li>
                    <li>
                      <div className="dishes-list-img">
                        <img
                          alt="trending-dishe"
                          src={require("../../assets/img/trending-dishe-5.png")}
                        />
                      </div>
                      <h5>
                        <Link to="#">chicken wings served with sriracha</Link>
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="posts">
                  <h3>Quick Links</h3>
                  <ul className="higher-reach">
                    <li>
                      <div className="bol" />
                      <Link to="#"> Recent News.</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link to="#"> Articles For Food.</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link to="#"> Food Menu</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link to="#"> Site Map</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link to="#"> Contact us</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link to="#"> About Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ourblog;
