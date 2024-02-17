import React from "react";
import { tabContent } from "../../components/discoverMenu/Discovermenu";
import private1 from "../../assets/img/private-dining-1.jpg";
import private2 from "../../assets/img/private-dining-2.jpg";
import private3 from "../../assets/img/private-dining-3.jpg";
import private4 from "../../assets/img/private-dining-4.jpg";
import { Link } from "react-router-dom";
import Banner from "../../components/pageBanner/Banner";
import usePathname from "../../utils/usePathname";
import Loader from "../../components/loader/Loader";
// import { useSelector } from "react-redux";

const Menu = () => {
  const pathname = usePathname();
  // const { isLoading } = useSelector((state) => state.loader);
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  // useEffect(() => {
  //   const times = setTimeout(() => {
  //     setIsTimeout(false);
  //   }, 2200);

  //   return () => clearTimeout(times);
  // }, []);

  return (
    <>
      <Loader />
      <div>
        <Banner paths={pathArr} />
        <section className="gap no-bottom">
          <div className="container">
            {tabContent.map((content, indx) => {
              const { image, title, data, id } = content;
              return (
                <>
                  <div
                    className={`row align-items-center discover-menu ${
                      id !== 1 ? "mt-5" : ""
                    }`}
                    key={indx + 1}
                  >
                    <div className="col-xl-6">
                      <div className="discover-img">
                        <img alt="discover" src={image} />
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="discover">
                        <h4>{title}</h4>
                        <ul>
                          {data.map((itm, index) => {
                            return (
                              <>
                                <li>
                                  <div>
                                    <h6>{itm.title}</h6>
                                    <p>{itm.desc}</p>
                                  </div>
                                  <span>{itm.price}</span>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
        <section className="gap">
          <div className="container private">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <div className="private-dining">
                  <img alt="private-dining" src={private1} />
                  <img alt="private-dining" src={private2} />
                  <img alt="private-dining" src={private3} />
                  <img alt="private-dining" src={private4} />
                </div>
              </div>
              <div className="col-xl-5">
                <div className="private-dining-text">
                  <h2>Private Dining and Events</h2>
                  <p>
                    With many private dining spaces, M is the perfect place to
                    host your event or gathering
                  </p>
                  <Link to="/contact" className="button">
                    Enquire Now
                  </Link>
                  <h5>
                    Booking:
                    <a href="callto:+441298123987" className="ms-3">
                      +44 1298 123 987
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Menu;
