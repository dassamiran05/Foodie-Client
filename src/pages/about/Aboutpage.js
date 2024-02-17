import React from "react";
import About from "../../components/aboutSection/About";
import {
  AfterNoonTea,
  CocktailIcon,
  DiningIcon,
  EasyOrderIcon,
  ExploreMenuIcon,
  PlaceOrderIcon,
  PlayIcon,
} from "../../components/svgIcons/Svgicons";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Aboutpage = () => {
  const pathname = usePathname();
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());
  return (
    <>
      <Loader />
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
                <h2>About Us</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="index.html">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  about
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
      <About />
      <section className="how-we-work">
        <div className="container">
          <div className="row">
            <div className="col-xl-7">
              <div className="heading">
                <h6>EASY ORDER IN 3 STEPS</h6>
                <h2>How We Work</h2>
              </div>
              <div className="easy-orded-style">
                <div className="easy-orded">
                  <sup>1</sup>
                  <i>
                    <ExploreMenuIcon />
                  </i>
                  <h4>Explore Menu</h4>
                  <p>
                    A range of powerful tools for viewing, querying and
                    filtering your data.
                  </p>
                </div>
                <div className="easy-orded">
                  <sup>2</sup>
                  <i>
                    <EasyOrderIcon />
                  </i>
                  <h4>Choose a Dish</h4>
                  <p>
                    A range of powerful tools for viewing, querying and
                    filtering your data.
                  </p>
                </div>
                <div className="easy-orded">
                  <sup>3</sup>
                  <i>
                    <PlaceOrderIcon />
                  </i>
                  <h4>Place Order</h4>
                  <p>
                    A range of powerful tools for viewing, querying and
                    filtering your data.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="easy-orded-video">
                <img
                  alt="arrow"
                  className="arrow"
                  src={require("../../assets/img/arrow-2.png")}
                />
                <span>Watch and Follow</span>
                <img
                  alt="easy-orded"
                  src={require("../../assets/img/easy-orded.jpg")}
                />
                <Link data-fancybox to="#">
                  <i>
                    <PlayIcon />
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gap" style={{ backgroundColor: "#f5f8fd" }}>
        <div className="container">
          <div className="heading-two">
            <h2>Restourant History</h2>
            <div className="line" />
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="history-text">
                <img
                  alt="history-img"
                  src={require("../../assets/img/history-1.jpg")}
                />
                <span>1994</span>
                <div>
                  <Link to="#">
                    <h3>Begins Shop</h3>
                  </Link>
                  <p>
                    Nisl quam nestibulum ac quam nec monte nascete ridiculus mus
                    nell umnec odio rbine.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="history-text">
                <img
                  alt="history-img"
                  src={require("../../assets/img/history-2.jpg")}
                />
                <span>2010</span>
                <div>
                  <Link to="#">
                    <h3>Restaurant</h3>
                  </Link>
                  <p>
                    Nisl quam nestibulum ac quam nec monte nascete ridiculus mus
                    nell umnec odio rbine.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="history-text">
                <img
                  alt="history-img"
                  src={require("../../assets/img/history-3.jpg")}
                />
                <span>2016</span>
                <div>
                  <Link to="#">
                    <h3>Online Shop</h3>
                  </Link>
                  <p>
                    Nisl quam nestibulum ac quam nec monte nascete ridiculus mus
                    nell umnec odio rbine.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="history-text">
                <img
                  alt="history-img"
                  src={require("../../assets/img/history-4.jpg")}
                />
                <span>2022</span>
                <div>
                  <Link to="#">
                    <h3>BBQ Restaurant</h3>
                  </Link>
                  <p>
                    Nisl quam nestibulum ac quam nec monte nascete ridiculus mus
                    nell umnec odio rbine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container ">
          <div className="best-solutions">
            <div className="heading">
              <span>Best Solutions</span>
              <h2>We Provide Best Services</h2>
            </div>
            <p>
              Nisl quam nestibulum ac quam nec odio elementu aucan ligula. Orci
              varius natoque pena tibus et maurient monte nascete ridiculus mus
              nellentesque um ac quam nec odio rbine.
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="best-solutions-service">
                <i>
                  <AfterNoonTea />
                </i>
                <Link to="#">
                  <h3>Afternoon Tea</h3>
                </Link>
                <p>
                  Nisl quam nestibulum ac quam nec aucan ligula Orci varius.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="best-solutions-service">
                <i>
                  <PlaceOrderIcon />
                </i>
                <Link to="#">
                  <h3>Takeaway &amp; Delivery</h3>
                </Link>
                <p>
                  Nisl quam nestibulum ac quam nec aucan ligula Orci varius.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="best-solutions-service">
                <i>
                  <CocktailIcon />
                </i>
                <Link to="#">
                  <h3>Wine &amp; Cocktails</h3>
                </Link>
                <p>
                  Nisl quam nestibulum ac quam nec aucan ligula Orci varius.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="best-solutions-service">
                <i>
                  <DiningIcon />
                </i>
                <Link to="#">
                  <h3>Alfresco Dining</h3>
                </Link>
                <p>
                  Nisl quam nestibulum ac quam nec aucan ligula Orci varius.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutpage;
