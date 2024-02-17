import React, { useEffect, useState } from "react";
import { CartIcon } from "../../components/svgIcons/Svgicons";
import { FaStar } from "react-icons/fa";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllproducts } from "../../redux/features/admin/product/productActions";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import "./style.css";
import {
  addToCart,
  calculateTotalprice,
} from "../../redux/features/cart/cartSlice";
import usePathname from "../../utils/usePathname";
import Banner from "../../components/pageBanner/Banner";

const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const { products, numberPage, loading } = useSelector(
    (state) => state.product
  );

  const pathname = usePathname();
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  console.log(
    pathname
      .split("/")
      .filter((path) => path !== "")
      .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase())
  );

  const pageNumbers = [...Array(numberPage + 1).keys()].slice(1);

  useEffect(() => {
    dispatch(getAllproducts({ page, limit }));
  }, [dispatch, page, limit]);

  const handleClick = (itm) => {
    setPage(itm);
  };

  const handleNextbtn = () => {
    setPage(page + 1);

    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handlePrevbtn = () => {
    setPage(page - 1);

    if ((page - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleAddtoCart = (item) => {
    const {
      category,
      description,
      rating,
      shipping,
      slug,
      sold,
      __v,
      ...newObj
    } = item;
    dispatch(addToCart(newObj));
    dispatch(calculateTotalprice());
  };

  return (
    <>
      <Loader />
      <div>
        <Banner paths={pathArr} />
        <section className="gap">
          <div className="container">
            <div className="row">
              {products &&
                products.length > 0 &&
                products.map((product, indx) => {
                  const { _id, name, photo, price } = product;
                  return (
                    <>
                      <div className="col-xl-4 col-md-6" key={indx + 1}>
                        <div className="featured-dishes">
                          <div className="featured-dishes-img">
                            <img alt={name} src={photo} />
                          </div>
                          <ul className="star">
                            {[...Array(5)].map((_) => (
                              <li>
                                <FaStar />
                              </li>
                            ))}
                          </ul>
                          <Link to={`/productdetail/${_id}`}>
                            <h5>{name}</h5>
                          </Link>
                          <p>
                            <span>$</span>
                            {price}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddtoCart(product);
                            }}
                          >
                            <i className="feature">
                              <CartIcon />
                            </i>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              <ul className="pagination m-auto mt-5">
                <li className="prev">
                  <button
                    onClick={handlePrevbtn}
                    disabled={page === 1 ? true : false}
                  >
                    <FaAngleDoubleLeft
                      style={{ fill: "#fff", fontSize: "22px" }}
                    />
                  </button>
                </li>
                {pageDecrementBtn}

                {pageNumbers.length > 0 &&
                  pageNumbers.map((item, indx) => {
                    if (
                      item < maxPageNumberLimit + 1 &&
                      item > minPageNumberLimit
                    ) {
                      return (
                        <>
                          <li
                            key={indx + 1}
                            onClick={() => handleClick(item)}
                            className={page === item ? "active" : null}
                          >
                            <Link to="#">{item}</Link>
                          </li>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                {pageIncrementBtn}
                <li className="next">
                  <button
                    onClick={handleNextbtn}
                    disabled={
                      page === pageNumbers[pageNumbers.length - 1]
                        ? true
                        : false
                    }
                  >
                    <FaAngleDoubleRight
                      style={{ fill: "#fff", fontSize: "22px" }}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
