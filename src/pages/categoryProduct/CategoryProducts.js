import React, { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import Banner from "../../components/pageBanner/Banner";
import usePathname from "../../utils/usePathname";
import { Link, useParams } from "react-router-dom";
import { getAllproductsByCategory } from "../../redux/features/admin/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import { CartIcon } from "../../components/svgIcons/Svgicons";
import { FaStar } from "react-icons/fa";
import { addToCart, calculateTotalprice } from "../../redux/features/cart/cartSlice";

const CategoryProducts = () => {
  const pathname = usePathname();
  const { loading, products } = useSelector((state) => state.product);
  const pathArr = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1).toLowerCase());

  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllproductsByCategory({ category }));
  }, [dispatch, category]);

  const handleAddtoCart = (item) => {
    const {
      category,
      description,
      rating,
      shipping,
      slug,
      sold,
      __v,
      regularPrice,
      createdAt,
      updatedAt,
      featured,
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
              {/* <ul className="pagination m-auto mt-5">
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
              </ul> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryProducts;
