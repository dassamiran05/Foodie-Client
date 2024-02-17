import React from "react";
import { Link } from "react-router-dom";

const LoginRegister = () => {
  return (
    <>
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
                <h2>Login</h2>
                <p>A magical combination that sent aromas to the taste buds</p>
              </div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  login
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
      </section>
      <section className="gap">
        <div className="container">
          <div className="row d-flex justify-content-center">
            {/* <div className="col-lg-6">
                <div className="box login">
                  <h3>Log In Your Account</h3>
                  <form>
                    <input
                      type="email"
                      name="email"
                      placeholder="Username or email address"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <div className="remember">
                      <div className="first">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <label htmlFor="checkbox">Remember me</label>
                      </div>
                      <div className="second">
                        <a href="javascript:void(0)">Forget a Password?</a>
                      </div>
                    </div>
                    <button type="submit" className="button">
                      Login
                    </button>
                  </form>
                </div>
              </div> */}
            <div className="col-lg-6">
              <div className="box register">
                <div
                  className="parallax"
                  style={{
                    backgroundImage: `url(${require("../../assets/img/patron.jpg")})`,
                  }}
                />
                <h3>Log In Your Account</h3>
                <form>
                  <input type="text" name="text" placeholder="Complete Name" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Username or email address"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                  </p>
                  <button type="submit" className="button">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginRegister;
