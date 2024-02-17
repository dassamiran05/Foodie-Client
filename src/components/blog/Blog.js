import React from "react";
import recent3 from"../../assets/img/recent-news-3.jpg"
import recent4 from"../../assets/img/recent-news-4.jpg"
import recent5 from"../../assets/img/recent-news-5.jpg"
import man from"../../assets/img/man.jpg"

const Blog = () => {
  return (
    <section className="gap">
      <div className="container">
        <div className="heading-two">
          <h2>Recent News</h2>
          <div className="line" />
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <div className="recent-news-two">
              <img alt="recent-news-img" src={recent3} />
              <div className="recent-news mt-3">
                <div>
                  <a href="#">
                    <span>29 December, 2023</span>
                  </a>
                  <a href="blog-details.html">
                    <h3>Table restaurant located in on Bank Street</h3>
                  </a>
                  <div className="d-flex align-items-center">
                    <img alt="img" className="me-3" src={man} />
                    <h6>by Thomas Walimes</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="recent-news-two">
              <img alt="recent-news-img" src={recent4} />
              <div className="recent-news mt-3">
                <div>
                  <a href="#">
                    <span>29 December, 2023</span>
                  </a>
                  <a href="blog-details.html">
                    <h3>Dining restaurant and lounge</h3>
                  </a>
                  <div className="d-flex align-items-center">
                    <img alt="img" className="me-3" src={man} />
                    <h6>by Thomas Walimes</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-news-two mt-4">
              <img alt="recent-news-img" src={recent5} />
              <div className="recent-news mt-3">
                <div>
                  <a href="#">
                    <span>29 December, 2023</span>
                  </a>
                  <a href="blog-details.html">
                    <h3>Browns Brasserie &amp; Bar</h3>
                  </a>
                  <div className="d-flex align-items-center">
                    <img alt="img" className="me-3" src={man} />
                    <h6>by Thomas Walimes</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
