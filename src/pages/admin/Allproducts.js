import React, { useEffect, useState } from "react";
import {
  getAllproducts,
  handleDeleteProduct,
} from "../../redux/features/admin/product/productActions";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetdataLoader from "./shared/GetdataLoader";
// import {
//   getCategories,
//   handleSingleCategory,
// } from "../../redux/features/admin/category/categoryActions";

const Allproducts = () => {
  const { loading, products, numberPage } = useSelector(
    (state) => state.product
  );

  const { userToken } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();

  const pageNumbers = [...Array(numberPage + 1).keys()].slice(1);

  // useEffect(() => {
  //   const newProductsarr = products.map((product) => {
  //     return {
  //       ...product,
  //       category: getCategoryByname(product?.category),
  //     };
  //   });
  //   setAllProducts(newProductsarr);
  // }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllproducts({ page, limit }));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, page, limit]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  const handleClick = (id, page) => {
    console.log(page);
    const isConfirm = window.confirm(`Are you sure to delete this product?`);
    if (isConfirm) {
      dispatch(handleDeleteProduct({ id: id, token: userToken })).then(
        (data) => {
          if (data.payload.success) {
            dispatch(getAllproducts({ page, limit }));
          }
        }
      );
    }
  };
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {loading ? (
                <GetdataLoader />
              ) : (
                <>
                  {numberPage !== 0 && (
                    <div
                      className="d-flex justify-content-end pages"
                      style={{
                        marginTop: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <span className="num">{page}</span> <span>/</span>{" "}
                      <span className="num">{numberPage}</span>
                    </div>
                  )}

                  {products?.length > 0 ? (
                    <>
                      <table className="table datatable">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Sold</th>
                            <th>Category</th>
                            <th>Quantiy</th>
                            <th>Photo</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products?.length > 0 &&
                            products?.map((product, indx) => {
                              return (
                                <>
                                  <tr key={indx + 1}>
                                    <td>{indx + 1}</td>
                                    <td>{product?.name}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.sold}</td>
                                    <td>{product?.category?.name}</td>
                                    <td>{product?.quantity}</td>
                                    <td>
                                      <div
                                        style={{
                                          height: "80px",
                                          width: "80px",
                                        }}
                                      >
                                        <img
                                          src={product.photo[0]}
                                          alt="productImage"
                                          className="h-100 w-100 object-fit-cover"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex gap-1">
                                        <span
                                          className="text-danger fs-4"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleClick(product?._id, page)
                                          }
                                        >
                                          <RiDeleteBin6Line />
                                        </span>
                                        <Link
                                          to={`/dashboard/updateproduct/${product?._id}`}
                                        >
                                          <span
                                            className="text-primary fs-4"
                                            style={{ cursor: "pointer" }}
                                          >
                                            <FaRegEdit />
                                          </span>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      <nav
                        aria-label="..."
                        className="d-flex justify-content-end"
                      >
                        <ul className="pagination pagination1">
                          <li
                            className={`d-flex align-items-center justify-content-center  ${
                              page === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              tabIndex={-1}
                              onClick={() =>
                                setPage(page === 1 ? page : page - 1)
                              }
                            >
                              Previous
                            </button>
                          </li>
                          {pageNumbers.map((singlepage, indx) => {
                            return (
                              <>
                                <li
                                  className={`d-flex align-items-center justify-content-center ${
                                    singlepage === page ? "active" : ""
                                  }`}
                                  onClick={() => setPage(singlepage)}
                                  key={indx + 1}
                                >
                                  <button className="page-link">
                                    {singlepage}
                                  </button>
                                </li>
                              </>
                            );
                          })}
                          {/* <li className="d-flex align-items-center justify-content-center ">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li
                            className="d-flex align-items-center justify-content-center  active"
                            aria-current="page"
                          >
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="d-flex align-items-center justify-content-center ">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li> */}
                          <li
                            className={`d-flex align-items-center justify-content-center  ${
                              page === numberPage ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                setPage(page === numberPage ? page : page + 1)
                              }
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </>
                  ) : (
                    <p>No Product found</p>
                  )}
                </>
              )}

              {/* End Table with stripped rows */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Allproducts;
