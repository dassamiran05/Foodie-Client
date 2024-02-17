import React, { useState } from "react";
import {
  BurgerIcon,
  CoffeeIcon,
  DesertIcon,
  PizzaIcon,
  SteakIcon,
} from "../svgIcons/Svgicons";

import desert from "../../assets/img/discover-1.png";
import steak from "../../assets/img/discover-2.png";
import coffee from "../../assets/img/discover-3.png";
import pizza from "../../assets/img/discover-8.png";
import burger from "../../assets/img/discover-7.png";

const buttons = [
  {
    id: 1,
    icon: <DesertIcon />,
    category: "home",
    ariaSelected: true,
    title: "Dessert",
    active: true,
  },
  {
    id: 2,
    icon: <SteakIcon />,
    category: "profile",
    title: "Steak",
  },
  {
    id: 3,
    icon: <CoffeeIcon />,
    category: "coffee",
    title: "Coffee",
  },
  {
    id: 4,
    icon: <PizzaIcon />,
    category: "pizza",
    title: "Pizza",
  },
  {
    id: 5,
    icon: <BurgerIcon />,
    category: "burger",
    title: "Burger",
  },
];

export const tabContent = [
  {
    id: 1,
    image: desert,
    active: true,
    category: "home",
    data: [
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
    ],
    title: "Dessert",
  },
  {
    id: 2,
    image: steak,
    category: "profile",
    data: [
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
    ],
    title: "Steak",
  },
  {
    id: 3,
    image: coffee,
    category: "coffee",
    data: [
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
    ],
    title: "Coffee menu",
  },
  {
    id: 4,
    image: pizza,
    category: "pizza",
    data: [
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
    ],
    title: "pizza",
  },
  {
    id: 5,
    image: burger,
    category: "burger",
    data: [
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
      {
        title: "Four Chease Garlic Bread",
        desc: "Toested french bread topped with romano",
        price: "$9.00",
      },
    ],
    title: "burger",
  },
];

const Discovermenu = () => {
  const [btns, setBtns] = useState(buttons);
  const [dtacontens, setDtacontens] = useState(tabContent);
  const [activeBtn, setActivebtn] = useState(1);

  const handlebtn = (data) => {
    setActivebtn(data);
    const newContentarr = dtacontens.map((itm, indx) =>
      itm.id === data ? { ...itm, active: true } : { ...itm, active: false }
    );

    setDtacontens(newContentarr);
  };

  return (
    <section className="section-discover-menu mb-5">
      <div className="container">
        <div className="heading-two">
          <h2>Discover Menu</h2>
          <div className="line" />
        </div>
        <div
          className="nav nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {btns.map((btn, indx) => {
            return (
              <>
                <button
                  className={`nav-link ${btn.id === activeBtn ? "active" : ""}`}
                  id={`v-pills-${btn.category}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#v-pills-${btn.category}`}
                  type="button"
                  role="tab"
                  aria-controls={`v-pills-${btn.category}`}
                  aria-selected={btn.ariaSelected}
                  key={indx + 1}
                  onClick={() => handlebtn(btn.id)}
                >
                  {btn.icon}
                  {btn.title}
                </button>
              </>
            );
          })}
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          {dtacontens.map((cntnt, index) => {
            return (
              <>
                <div
                  className={`tab-pane fade ${
                    cntnt.active ? "show active" : ""
                  }`}
                  id={`v-pills-${cntnt.category}`}
                  role="tabpanel"
                  aria-labelledby={`v-pills-${cntnt.category}-tab`}
                  key={index + 1}
                >
                  <div className="row align-items-center discover-menu">
                    <div className="col-xl-6">
                      <div className="discover-img">
                        <img alt="discover" src={cntnt.image} />
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="discover">
                        <h4>{cntnt.title}</h4>
                        <ul>
                          {cntnt.data.map((item, indx) => {
                            return (
                              <>
                                <li key={indx + 1}>
                                  <div>
                                    <h6>{item.title}</h6>
                                    <p>{item.desc}</p>
                                  </div>
                                  <span>{item.price}</span>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Discovermenu;
