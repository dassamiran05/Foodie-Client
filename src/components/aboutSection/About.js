import React from "react";
import girl from "../../assets/img/girl.jpg";
import img1 from "../../assets/img/restaurant.jpg";
import img2 from "../../assets/img/restaurant-2.jpg";
import img3 from "../../assets/img/restaurant-3.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const content = [
  {
    id: 1,
    title: "Restaurant",
    desc: "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
    image: img1,
  },
  {
    id: 2,
    title: "Coctail Bar",
    desc: "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
    image: img2,
  },
  {
    id: 3,
    title: "Private Dining",
    desc: "Nisl quam nestibulum ac quam nec aucan ligula. Orci varius natoque li um ac quam nec odio rbine.",
    image: img3,
  },
];

const About = () => {
  const { isLoading } = useSelector((state) => state.loader);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="gap">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="heading">
                <span>About The Food Restaurant</span>
                <h2>New Ground with Dishes to be Enjoyed</h2>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-text">
                <p>
                  Nisl quam nestibulum ac quam nec odio eleme aucan ligula. Orci
                  varius nat oque pena tibus et urient monte nascete ridiculus
                  mus nellentesq um ac qu am nec odio rbine. Nisl quam nestibu
                  aucan ligula.
                </p>
                <div className="mt-4 d-flex align-items-center">
                  <img alt="girl" src={girl} />
                  <div>
                    <h4>Willimes James</h4>
                    <p>Director and Chief Operations Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {content.map((item, index) => {
              return (
                <>
                  <div className="col-xl-4 col-lg-6" key={index + 1}>
                    <div
                      class={`restaurant-card ${
                        item.id === 2 ? "coctail" : ""
                      }`}
                    >
                      <img
                        alt="Restaurant-img"
                        className="w-100"
                        src={item.image}
                      />
                      <div className="restaurant-span">
                        <span>{item.title}</span>
                      </div>
                      <div className="coctail-bar">
                        <h5>{item.title}</h5>
                        <p>{item.desc}</p>
                        <Link to="/contact">Reserve a Table</Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
