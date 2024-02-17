import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ paths }) => {
  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${require("../../assets/img/background.png")})`,
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="title-area-data">
              <h2>{paths[0]}</h2>
              <p>A magical combination that sent aromas to the taste buds</p>
            </div>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fa-solid fa-house" /> Home
                </Link>
              </li>
              {paths.map((path, index) => {
                return (
                  <>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      key={index + 1}
                    >
                      {path}
                    </li>
                  </>
                );
              })}
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
    </section>
  );
};

export default Banner;
