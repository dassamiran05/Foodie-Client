import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
// import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Dfilter from "./shared/Dfilter";
import { FaCircle } from "react-icons/fa";
import Cardcomponent from "../../components/dashboard/Cardcomponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesData,
  getSoldProductsData,
  getcustomerData,
  getrevenueData,
} from "../../redux/features/admin/sales/salesActions";
import { getOrdersByOptions } from "../../redux/features/admin/orders/orderActions";
import SearchBar from "./shared/SearchBar";
import GetdataLoader from "./shared/GetdataLoader";

const Dashboard = () => {
  const [selectedSalestag, setSelectedSalesTag] = useState("This Month");
  const [selectedRevenuetag, setSelectedRevenueTag] = useState("This Month");
  const [selectedCustomertag, setSelectedCustomerTag] = useState("This Month");
  const [selectedOrdertag, setSelectedOrderTag] = useState("This Month");
  const [soldProductstag, setSoldproductsTag] = useState("This Month");
  const { userToken } = useSelector((state) => state.auth);
  const { orders, total, loading } = useSelector((state) => state.order);
  const {
    salesData,
    revenueData,
    customerData,
    soldProducts,
    loading: soldloading,
  } = useSelector((state) => state.sales);
  const [limit, setLimit] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    limit: "",
    period: "",
    search: "",
  });

  useEffect(() => {
    const options = {
      ...filterOptions,
      limit: Number(limit),
      period: selectedOrdertag,
      search: searchInput,
    };
    setFilterOptions(options);
  }, [limit, selectedOrdertag, searchInput]);

  const modifiedOrders = orders.map((order) => {
    const { user, products, payment } = order;
    return {
      customer: user.name,
      product: products.map((item) => {
        const { name, price, cartQuantity } = item;
        return {
          name: name,
          price: price,
          quantity: cartQuantity,
        };
      }),
      status: payment.status,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesData({ token: userToken, filterTag: selectedSalestag }));
  }, [dispatch, selectedSalestag, userToken]);

  useEffect(() => {
    dispatch(
      getrevenueData({ token: userToken, filterTag: selectedRevenuetag })
    );
  }, [dispatch, selectedRevenuetag, userToken]);

  useEffect(() => {
    dispatch(
      getcustomerData({ token: userToken, filterTag: selectedCustomertag })
    );
  }, [dispatch, selectedCustomertag, userToken]);

  useEffect(() => {
    dispatch(
      getSoldProductsData({ token: userToken, filterTag: soldProductstag })
    );
  }, [dispatch, soldProductstag, userToken]);

  useEffect(() => {
    if (Object.values(filterOptions).length > 0) {
      const timer = setTimeout(() => {
        dispatch(
          getOrdersByOptions({ token: userToken, filterOptions: filterOptions })
        );
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [dispatch, userToken, filterOptions]);

  const selectOptions = [
    { value: 5, title: 5 },
    { value: 10, title: 10 },
    { value: 15, title: 15 },
    { value: total, title: "All" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-xxl-4 col-md-6">
                <Cardcomponent
                  title="Sales"
                  type="sales-card"
                  selectedtag={selectedSalestag}
                  setSelectedTag={setSelectedSalesTag}
                  icon={<IoCartOutline />}
                  data={salesData}
                />
              </div>
              <div className="col-xxl-4 col-md-6">
                <Cardcomponent
                  title="Revenue"
                  type="revenue-card"
                  selectedtag={selectedRevenuetag}
                  setSelectedTag={setSelectedRevenueTag}
                  icon={<BsCurrencyDollar />}
                  data={revenueData}
                />
              </div>
              <div className="col-xxl-4 col-xl-12">
                <Cardcomponent
                  title="Customer"
                  type="customers-card"
                  selectedtag={selectedCustomertag}
                  setSelectedTag={setSelectedCustomerTag}
                  icon={<BsPeople />}
                  data={customerData}
                />
              </div>
              <div className="col-12">
                <div className="card recent-sales overflow-auto">
                  <Dfilter
                    selectedtag={selectedOrdertag}
                    setSelectedTag={setSelectedOrderTag}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Recent Sales <span>| {selectedOrdertag}</span>
                    </h5>
                    <div className="datatable-top header">
                      <div className="datatable-dropdown">
                        <label>
                          <select
                            className="datatable-selector"
                            onChange={(e) => setLimit(e.target.value)}
                          >
                            {selectOptions.map((item) => (
                              <option value={item.value}>{item.title}</option>
                            ))}
                          </select>{" "}
                          entries per page
                        </label>
                      </div>
                      <div className="search-bar">
                        <SearchBar
                          isHeader={false}
                          searchInput={searchInput}
                          setSearchInput={setSearchInput}
                          handlesearch={handleSearch}
                        />
                      </div>
                    </div>

                    <table className="table table-borderless datatable">
                      {loading && <GetdataLoader />}
                      {!loading && orders.length > 0 && (
                        <>
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Customer</th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, index) => {
                              return (
                                <>
                                  <tr key={index + 1}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.user.name}</td>
                                    <td>
                                      {order.products
                                        ?.map((item) => item?.name)
                                        .join(", ")}
                                    </td>
                                    <td>
                                      $
                                      {order.products?.reduce(
                                        (acc, curr) =>
                                          acc +
                                          curr?.price * curr?.cartQuantity,
                                        0
                                      )}
                                    </td>
                                    <td>
                                      <span
                                        className={`badge bg-${
                                          order.payment.status
                                            ? "success"
                                            : "warning"
                                        }`}
                                      >
                                        {order.payment.status
                                          ? "Approved"
                                          : "Pending"}
                                      </span>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </>
                      )}
                      {!loading && orders.length === 0 && (
                        <p className="mt-2">There is no data to show</p>
                      )}
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card top-selling overflow-auto">
                  <Dfilter
                    selectedtag={soldProductstag}
                    setSelectedTag={setSoldproductsTag}
                  />
                  <div className="card-body pb-0">
                    <h5 className="card-title">
                      Top Selling <span>| {soldProductstag}</span>
                    </h5>
                    <table className="table table-borderless">
                      {soldloading && <GetdataLoader />}
                      {!soldloading && soldProducts.length > 0 && (
                        <>
                          <thead>
                            <tr>
                              <th scope="col">Preview</th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">Sold</th>
                              <th scope="col">Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            {soldProducts &&
                              soldProducts.length > 0 &&
                              soldProducts.map((item) => {
                                const {
                                  preview,
                                  productName,
                                  price,
                                  sold,
                                  revenue,
                                } = item;
                                return (
                                  <>
                                    <tr>
                                      <th scope="row">
                                        <Link to="#">
                                          <img src={preview[0]} alt="" />
                                        </Link>
                                      </th>
                                      <td>
                                        <Link
                                          to="#"
                                          className="text-primary fw-bold"
                                        >
                                          {productName}
                                        </Link>
                                      </td>
                                      <td>${price}</td>
                                      <td className="fw-bold">{sold}</td>
                                      <td>${revenue}</td>
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </>
                      )}
                      {!soldloading && soldProducts.length === 0 && (
                        <p className="mt-2">There is no data to show</p>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <Dfilter />
              <div className="card-body">
                <h5 className="card-title">
                  Recent Activity <span>| Today</span>
                </h5>
                <div className="activity">
                  <div className="activity-item d-flex">
                    <div className="activite-label">32 min</div>
                    <FaCircle className="activity-badge text-success align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-success align-self-start" /> */}
                    <div className="activity-content">
                      Quia quae rerum{" "}
                      <Link to="#" className="fw-bold text-dark">
                        explicabo officiis
                      </Link>{" "}
                      beatae
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">56 min</div>
                    <FaCircle className="activity-badge text-danger align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-danger align-self-start" /> */}
                    <div className="activity-content">
                      Voluptatem blanditiis blanditiis eveniet
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">2 hrs</div>
                    <FaCircle className="activity-badge text-primary align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-primary align-self-start" /> */}
                    <div className="activity-content">
                      Voluptates corrupti molestias voluptatem
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">1 day</div>
                    <FaCircle className="activity-badge text-info align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-info align-self-start" /> */}
                    <div className="activity-content">
                      Tempore autem saepe{" "}
                      <Link to="#" className="fw-bold text-dark">
                        occaecati voluptatem
                      </Link>{" "}
                      tempore
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">2 days</div>
                    <FaCircle className="activity-badge text-warning align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-warning align-self-start" /> */}
                    <div className="activity-content">
                      Est sit eum reiciendis exercitationem
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">4 weeks</div>
                    <FaCircle className="activity-badge text-muted align-self-start" />
                    {/* <i className="bi bi-circle-fill activity-badge text-muted align-self-start" /> */}
                    <div className="activity-content">
                      Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card">
              <Dfilter />
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Website Traffic <span>| Today</span>
                </h5>
                <div
                  id="trafficChart"
                  style={{ minHeight: 400 }}
                  className="echart"
                />
              </div>
            </div> */}
            <div className="card">
              <Dfilter />
              <div className="card-body pb-0">
                <h5 className="card-title">
                  News &amp; Updates <span>| Today</span>
                </h5>
                <div className="news">
                  <div className="post-item clearfix">
                    <img
                      src={require("../../assets/admin/img/news-1.jpg")}
                      alt=""
                    />
                    <h4>
                      <Link to="#">Nihil blanditiis at in nihil autem</Link>
                    </h4>
                    <p>
                      Sit recusandae non aspernatur laboriosam. Quia enim
                      eligendi sed ut harum...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img
                      src={require("../../assets/admin/img/news-2.jpg")}
                      alt=""
                    />
                    <h4>
                      <Link to="#">Quidem autem et impedit</Link>
                    </h4>
                    <p>
                      Illo nemo neque maiores vitae officiis cum eum turos elan
                      dries werona nande...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img
                      src={require("../../assets/admin/img/news-3.jpg")}
                      alt=""
                    />
                    <h4>
                      <Link to="#">
                        Id quia et et ut maxime similique occaecati ut
                      </Link>
                    </h4>
                    <p>
                      Fugiat voluptas vero eaque accusantium eos. Consequuntur
                      sed ipsam et totam...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img
                      src={require("../../assets/admin/img/news-4.jpg")}
                      alt=""
                    />
                    <h4>
                      <Link to="#">Laborum corporis quo dara net para</Link>
                    </h4>
                    <p>
                      Qui enim quia optio. Eligendi aut asperiores enim
                      repellendusvel rerum cuder...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img
                      src={require("../../assets/admin/img/news-5.jpg")}
                      alt=""
                    />
                    <h4>
                      <Link to="#">
                        Et dolores corrupti quae illo quod dolor
                      </Link>
                    </h4>
                    <p>
                      Odit ut eveniet modi reiciendis. Atque cupiditate libero
                      beatae dignissimos eius...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
