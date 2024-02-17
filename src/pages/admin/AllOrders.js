import React, { useEffect, useState } from "react";
import GetdataLoader from "./shared/GetdataLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderStatusUpdate,
  getOrders,
} from "../../redux/features/admin/orders/orderActions";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders({ token: userToken }));
  }, [dispatch, userToken]);

  const handleOrderStatusChange = (orderId, value) => {
    dispatch(getOrderStatusUpdate({ id: orderId, value, token: userToken }));
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
                  {orders?.length > 0 ? (
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
