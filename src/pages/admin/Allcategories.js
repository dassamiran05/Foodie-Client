import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  handleDeleteCategory,
} from "../../redux/features/admin/category/categoryActions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetdataLoader from "./shared/GetdataLoader";

const Allcategories = () => {
  const dispatch = useDispatch();

  const { loading, category } = useSelector((state) => state.category);
  const { userToken } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleClick = (id) => {
    const isConfiem = window.confirm(`Are you sure to delete this item?`);
    if (isConfiem) {
      dispatch(handleDeleteCategory({ id: id, token: userToken }));
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
                  {category?.length > 0 ? (
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category &&
                          category?.length > 0 &&
                          category?.map((cat, indx) => {
                            return (
                              <>
                                <tr key={indx + 1}>
                                  <td>{indx + 1}</td>
                                  <td>{cat?.name}</td>
                                  <td>{cat?.slug}</td>
                                  <td>
                                    <div className="d-flex gap-1">
                                      <span
                                        className="text-danger fs-4"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleClick(cat?._id)}
                                      >
                                        <RiDeleteBin6Line />
                                      </span>
                                      <Link
                                        to={`/dashboard/update/${cat?._id}`}
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
                  ) : (
                    <p>No Category found</p>
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

export default Allcategories;
