import React, { useEffect, useState } from "react";
import GetdataLoader from "./shared/GetdataLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderStatusUpdate,
  getOrders,
} from "../../redux/features/admin/orders/orderActions";
import SearchBar from "./shared/SearchBar";

const AllOrders = () => {
  const { userToken } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState([
    { value: "Not Process", styleBorder: "orange" },
    { value: "Processing", styleBorder: "blue" },
    { value: "Shipped", styleBorder: "cyan" },
    { value: "deliverd", styleBorder: "darkgreen" },
    { value: "cancel", styleBorder: "red" },
    { value: "Pending", styleBorder: "violet" },
  ]);
  const { numberPage, count } = useSelector((state) => state.order);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filterOptions, setFilterOptions] = useState({
    limit,
    page: 1,
    search: "",
  });

  // const pageNo = Math.ceil(count / limit);

  useEffect(() => {
    const options = {
      ...filterOptions,
      // limit: Number(limit),
      page: page,
      search: searchInput,
    };
    setFilterOptions(options);
  }, [page, searchInput]);

  useEffect(() => {
    if (searchInput) {
      setPage(1);
    }
  }, [searchInput, page]);

  const pageNumbers = [...Array(numberPage + 1).keys()].slice(1);

  useEffect(() => {
    dispatch(getOrders({ token: userToken, options: filterOptions }));
  }, [dispatch, userToken, filterOptions]);

  const handleOrderStatusChange = (orderId, value) => {
    dispatch(
      getOrderStatusUpdate({
        id: orderId,
        value,
        token: userToken,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="datatable-top header d-flex justify-content-end">
              <div className="search-bar">
                <SearchBar
                  isHeader={false}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  handlesearch={handleSearch}
                />
              </div>
            </div>

            <div className="card-body">
              {loading ? (
                <GetdataLoader />
              ) : (
                <>
                  {orders?.length > 0 ? (
                    <>
                      <table className="table datatable">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Customer name</th>
                            <th>Customer Email</th>
                            <th>Products with quantity</th>
                            <th>Payment status</th>
                            {/* <th>Subtotal</th> */}
                            {/* <th>Total</th> */}
                            <th>Delivery Status</th>
                            <th>Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders?.length > 0 &&
                            orders?.map((order, indx) => {
                              const {
                                createdAt,
                                delivery_status,
                                payment,
                                products,
                                subtotal,
                                total,
                                user,
                                _id,
                              } = order;
                              return (
                                <>
                                  <tr key={indx + 1}>
                                    <td>{indx + 1}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                      {products.map((product, index) => {
                                        const { name, cartQuantity } = product;
                                        return (
                                          <>
                                            <div key={index + 1}>
                                              <span>{`${name}(${cartQuantity})`}</span>
                                            </div>
                                          </>
                                        );
                                      })}
                                    </td>
                                    <td>
                                      <span class="badge bg-success">
                                        {payment?.status}
                                      </span>
                                    </td>
                                    {/* <td>{subtotal}₹</td> */}
                                    {/* <td>{total}₹</td> */}
                                    <td>
                                      <div className="mb-3">
                                        <select
                                          class="form-select"
                                          aria-label="Default select example"
                                          defaultValue={delivery_status}
                                          onChange={(e) => {
                                            handleOrderStatusChange(
                                              _id,
                                              e.target.value
                                            );
                                          }}
                                          style={{
                                            border: `2px solid ${
                                              orderStatus.find(
                                                (item) =>
                                                  item.value === delivery_status
                                              ).styleBorder
                                            }`,
                                          }}
                                        >
                                          {orderStatus.map((item, indx) => {
                                            return (
                                              <>
                                                <option
                                                  value={item.value}
                                                  key={indx + 1}
                                                >
                                                  {item.value}
                                                </option>
                                              </>
                                            );
                                          })}
                                        </select>
                                      </div>
                                    </td>
                                    <td>{createdAt}</td>
                                    {/* <td className="position-relative">
                                    <button
                                      className="btn btn-primary adminbtn"
                                      onClick={() => handleAdmin(email)}
                                    >
                                      <RiAdminFill />
                                    </button>
                                  </td> */}
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      {numberPage !== 1 && (
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
                      )}
                    </>
                  ) : (
                    <p>No Category found</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllOrders;
