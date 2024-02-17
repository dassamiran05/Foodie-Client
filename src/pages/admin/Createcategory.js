import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  handleCreateCategory,
  handleSingleCategory,
  handleUpdateCategory,
} from "../../redux/features/admin/category/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";

const Createcategory = () => {
  const { userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { singlecategory } = useSelector((state) => state.category);

  const [catname, setCatname] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(handleSingleCategory(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singlecategory?.name) {
      setCatname(singlecategory?.name);
    }
  }, [singlecategory?.name]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: id ? catname : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const catData = {
        value: values,
        accessToken: userToken,
        id: id ? id : null,
      };
      if (id) {
        dispatch(handleUpdateCategory(catData));
        setCatname("");
      } else {
        dispatch(handleCreateCategory(catData));
      }

      formik.handleReset();
    },
  });

  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Category</h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputText"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      style={{
                        border:
                          formik.touched.name &&
                          formik.errors.name &&
                          "2px solid red",
                      }}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Createcategory;
