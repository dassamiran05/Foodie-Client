import React from "react";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const BlogDetails = () => {
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
                  <h2>Blog Details</h2>
                  <p>
                    A magical combination that sent aromas to the taste buds
                  </p>
                </div>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="index.html">
                      <i className="fa-solid fa-house" /> Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    our blog
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog Details
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
                      <Link href="#">
                        <span>29 December, 2023</span>
                      </Link>
                      <h2>Tender fried baby squid with a salt, pepper</h2>
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
                <p>
                  Nisl quam nestibulum ac quam nec odio elementu aucan ligula.
                  Orci varius natoque pena tibus et ma urient monte nascete
                  ridiculus mus nellente sque um ac quam nec odio rbine. Nisl
                  quam nestibulum ac quam nec odio elementu aucan ligula. Orci
                  varius natoque pena tibus et ma urie nt monte nascete
                  ridiculus mus nellentesque um ac quam nec odio rbine. Nisl
                  quam nestibulu m ac quam nec odio elementu aucan ligula. Orci
                  varius natoque pena tibus et ma urient monte nascete ridiculus
                  mus nellentesque um ac quam nec odio rbine. Nisl quam
                  nestibulum ac quam nec odio elementu aucan ligula. Orci varius
                  natoque penac quam nec odio rbine.
                  <br />
                  <br />
                  te nascete ridiculus mus nellentesque um ac quam nec odio
                  rbine. Nisl quam nestibulum ac qu am nec odio elementu aucan
                  ligula. Orci varius natoque pena tibus et ma urient monte
                  nascete ridiculus mus nellentesque um ac quam nec odio rbine.
                  Nisl quam nestibulum ac quam nec odio elementu aucan ligula.
                  Orci varius natoque penac quam nec odio rbine.
                </p>
                <div className="quote">
                  <div>
                    <i>
                      <svg
                        fill="#000000"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="200px"
                        height="200px"
                        viewBox="0 0 91.674 91.674"
                        xmlSpace="preserve"
                      >
                        <path
                          d="M38.157,0.003c-8.398,0.373-15.895,3.722-21.68,9.685C1.141,25.498,1.436,55.3,1.52,58.596l0.001,31.078
            c0,1.104,0.896,2,2,2h30.691c1.104,0,2-0.896,2-2V58.981c0-1.104-0.896-2-2-2H18.527c0.003-2.562,0.313-25.309,10.186-35.455
            c2.672-2.747,5.836-4.214,9.674-4.485c1.048-0.074,1.859-0.945,1.859-1.995V2.002c0-0.546-0.223-1.068-0.617-1.445
            C39.234,0.179,38.71-0.031,38.157,0.003z"
                        />
                        <path
                          d="M89.553,0.556c-0.395-0.377-0.906-0.587-1.472-0.553C79.684,0.375,72.186,3.725,66.4,9.688
            C51.065,25.498,51.359,55.3,51.443,58.596l0.001,31.078c0,1.104,0.896,2,2,2h30.69c1.104,0,2-0.896,2-2V58.981
            c0-1.104-0.896-2-2-2H68.452c0.003-2.562,0.313-25.309,10.185-35.455c2.673-2.747,5.837-4.214,9.675-4.485
            c1.048-0.074,1.858-0.945,1.858-1.995V2.002C90.17,1.457,89.947,0.935,89.553,0.556z"
                        />
                      </svg>
                    </i>
                  </div>
                  <h3>
                    A good restaurant is like a vacation; it transports you, and
                    it becomes a lot more than just about the food.{" "}
                  </h3>
                </div>
                <div className="blog-img">
                  <img
                    alt="blog-img"
                    src={require("../../assets/img/blog-img.jpg")}
                  />
                  <h4>Table restaurant located in on Bank Street</h4>
                </div>
                <div className="strawberry">
                  <h3>Strawberry Pretzel Dessert</h3>
                  <p>
                    Nisl quam nestibulum ac quam nec odio elementu aucan ligula.
                    Orci varius natoque pena tibus et ma urient monte nascete
                    ridiculus mus nellente sque um ac quam nec odio rbine. Nisl
                    quam nestibulum ac quam nec odio elementu aucan ligula. Orci
                    varius natoque pena tibus et ma urient monte nascete
                    ridiculus mus nellentesque um ac qua.
                  </p>
                  <ul className="quality-foods mt-4">
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/check.png")}
                      />
                      <h6>Fresh &amp; Tasty</h6>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/check.png")}
                      />
                      <h6>Best in organic foods</h6>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/check.png")}
                      />
                      <h6>100 Fresh Ingredients</h6>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/check.png")}
                      />
                      <h6>Better for your Health</h6>
                    </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="blog-img-video video">
                      <img
                        alt="video-img"
                        src={require("../../assets/img/video-img.jpg")}
                      />
                      <Link
                        data-fancybox
                        href="https://www.youtube.com/watch?v=1La4QzGeaaQ"
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
                          </svg>
                        </i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="blog-img-video">
                      <img
                        alt="video-img"
                        src={require("../../assets/img/video-img-2.jpg")}
                      />
                    </div>
                  </div>
                </div>
                <p>
                  et ma urient monte nascete ridiculus mus nellente sque um ac
                  quam nec odio rbine. Nisl quam nestibulum ac quam nec odio
                  elementu aucan ligula. Orci varius natoque pena tibus et ma
                  urient monte nascete ridiculus mus nellentesque um ac qua.
                </p>
                <div className="post-tags">
                  <h6>Tags:</h6>
                  <ul>
                    <li>
                      <Link href="#">Salt</Link>
                    </li>
                    <li>
                      <Link href="#">Hotel</Link>
                    </li>
                    <li>
                      <Link href="#">Lime Dip</Link>
                    </li>
                  </ul>
                </div>
                <div className="comment">
                  <h3>02 Comments</h3>
                  <ul>
                    <li className="single-comment">
                      <img
                        alt="img"
                        src={require("../../assets/img/comment-1.jpg")}
                      />
                      <Link href="#">reply</Link>
                      <div className="ps-md-4">
                        <div className="d-md-flex align-items-center">
                          <h4>Smith Johnson</h4>
                          <span>January 7, 2023 </span>
                        </div>
                        <p>
                          Nellente sque um ac quam nec odio rbine. Nisl quam
                          nestibulum ac quam nec io elementu aucan ligula.
                        </p>
                      </div>
                    </li>
                    <li className="single-comment children">
                      <img
                        alt="img"
                        src={require("../../assets/img/comment-2.jpg")}
                      />
                      <Link href="#">reply</Link>
                      <div className="ps-md-4">
                        <div className="d-md-flex align-items-center">
                          <h4>Willimes Dom</h4>
                          <span>January 7, 2023</span>
                        </div>
                        <p>
                          Nellente sque um ac quam nec odio rbine. Nisl quam
                          nestibulum ac quam nec io elementu aucan ligula.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <form className="add-review leave-comment comment">
                  <div className="rating">
                    <h3>Add Review</h3>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 ps-lg-0">
                      <input type="text" name="name" placeholder="Full Name" />
                    </div>
                    <div className="col-lg-6 pe-lg-0">
                      <input
                        type="text"
                        name="Email"
                        placeholder="Email Address"
                      />
                    </div>
                    <textarea placeholder="Your Comment" defaultValue={""} />
                    <button className="button">
                      <span>post Comment</span>
                    </button>
                  </div>
                </form>
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
                        <Link href="#">29 December, 2022</Link>
                        <h6>
                          <Link href="#">
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
                        <Link href="#">29 December, 2022</Link>
                        <h6>
                          <Link href="#">
                            There’s only one kind of happiness
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <img
                        alt="img"
                        src={require("../../assets/img/recent-news-blog-3.jpg")}
                      />
                      <div>
                        <Link href="#">29 December, 2022</Link>
                        <h6>
                          <Link href="#">comes in all shapes and sizes.</Link>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="posts">
                  <h3>Categories</h3>
                  <ul className="categories">
                    <li className="pt-0">
                      <Link href="#">
                        food<span>12</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        Inspiration<span>13</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        Lifestyle<span>19</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        People<span>22</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        Recipes <span>11</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
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
                        href="assets/img/photo-gallery-1.jpg"
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
                        href="assets/img/photo-gallery-2.jpg"
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
                        href="assets/img/photo-gallery-3.jpg"
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
                        href="assets/img/photo-gallery-4.jpg"
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
                        href="assets/img/photo-gallery-5.jpg"
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
                        href="assets/img/photo-gallery-6.jpg"
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
                  <Link href="#">Follow @winsfolio</Link>
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
                        <Link href="#">Rolls with vermicelli &amp; pickle</Link>
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
                        <Link href="#">Spicy salad rolls with enoki</Link>
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
                        <Link href="#">chicken wings served with sriracha</Link>
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
                        <Link href="#">spicy salad rolls with enoki</Link>
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
                        <Link href="#">chicken wings served with sriracha</Link>
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="posts">
                  <h3>Quick Links</h3>
                  <ul className="higher-reach">
                    <li>
                      <div className="bol" />
                      <Link href="#"> Recent News.</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link href="#"> Articles For Food.</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link href="#"> Food Menu</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link href="#"> Site Map</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link href="#"> Contact us</Link>
                    </li>
                    <li>
                      <div className="bol" />
                      <Link href="#"> About Us</Link>
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

export default BlogDetails;
