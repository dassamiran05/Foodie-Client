import React from "react";
import fooimg from "../../assets/img/footer.png"
import logoWhite from "../../assets/img/logo-white.png"
import tripa from "../../assets/img/tripa.png"

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${fooimg})`,
        backgroundColor: "#f5f8fd",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <div className="logo-white">
              <a href="index.html">
                <img alt="logo-white" src={logoWhite} />
              </a>
              <p>
                Tuesday - Saturday: 12:00pm - 23:00pm
                <span>Closed on Sunday</span>
              </p>
              <img alt="tripa" src={tripa} />
              <h6>5 star rated on TripAdvisor</h6>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-6">
            <div className="link-about">
              <h3>About</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="about.html">Information</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="#">Special Dish</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="#">Reservation</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-6">
            <div className="link-about">
              <h3>menu</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="menu-1.html">Steaks</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="menu-1.html">Burgers</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="menu-1.html">Coctails</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="menu-1.html">Bar B Q</a>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right" />
                  <a href="menu-1.html">Desserts</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="link-about">
              <h3>Newsletter</h3>
              <p>Get recent news and updates.</p>
              <form className="footer-form">
                <input
                  type="text"
                  name="Enter Your Email Address"
                  placeholder="Enter Your Email Address..."
                />
                <button className="button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-bootem">
          <h6>
            <span>© 2024 Foodie</span> | Restaurant and BBQ.
          </h6>
          <div className="header-social-media">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
