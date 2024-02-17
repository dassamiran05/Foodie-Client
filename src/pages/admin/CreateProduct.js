import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/features/admin/category/categoryActions";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
// import { validationSchema } from "./schemas";
import PreviewImage from "./PreviewImage";
import {
  handleCreateProduct,
  handleSingleProduct,
  handleUpdateProduct,
} from "../../redux/features/admin/product/productActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  handleSinglephotourl,
  resetSingleproductState,
} from "../../redux/features/admin/product/productSlice";
import Addproductloader from "./loader/Addproductloader";

const CustomField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <input
            {...field}
            {...props}
            className={`form-control ${
              meta.touched && meta.error ? "input-error" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-danger">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};
const CustomTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <textarea
            {...field}
            {...props}
            className={`form-control ${
              meta.touched && meta.error ? "input-error" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-danger">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};

const CustomFileUploadField = ({ fileRef, ...props }) => {
  const [field, meta, helper] = useField(props);
  console.log(props, field, meta, helper, fileRef);
  console.log(fileRef?.current?.files);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">
          File Upload
        </label>
        <div className="col-sm-10">
          <input
            {...field}
            {...props}
            ref={fileRef}
            multiple={true}
            className={`form-control ${
              meta.touched && meta.error ? "input-error" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-danger">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <select
            {...field}
            {...props}
            className={`form-select ${
              meta.touched && meta.error ? "input-error" : ""
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-danger">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};

const shippings = [
  { id: 1, value: "free", title: "Free Shipping" },
  { id: 2, value: "paid", title: "Paid Shipping" },
];

const isfeatures = [
  { id: 1, value: "Y", title: "True" },
  { id: 2, value: "N", title: "False" },
];

const CreateProduct = () => {
  const { category } = useSelector((state) => state.category);
  const { userToken } = useSelector((state) => state.auth);
  const { singleproduct, loading } = useSelector((state) => state.product);
  const [singleItemEdit, setSingleItemEdit] = useState({});
  const [addimgmode, setAddimgmode] = useState(false);
  const fileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  let {
    name,
    regularPrice,
    price,
    description,
    photo,
    category : productCategory,
    quantity,
    shipping,
    photourl,
    featured,
  } = singleItemEdit;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(handleSingleProduct(id));
    } else {
      dispatch(resetSingleproductState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    const handleSingle = () => {
      if (singleproduct) {
        setSingleItemEdit(singleproduct);
      }
    };

    handleSingle();
  }, [singleproduct]);

  useEffect(() => {
    return () => {
      dispatch(resetSingleproductState());
    };
  }, [dispatch]);

  const initialval = {
    name: name ? name : "",
    regularPrice: regularPrice ? regularPrice : "",
    price: price ? price : "",
    description: description ? description : "",
    photo: "",
    category: productCategory?._id ? productCategory?._id : "",
    quantity: quantity ? quantity : "",
    shipping: shipping
      ? shippings.find((item) => item.value === shipping)?.value
      : "",
    featured: featured ? featured : "",
  };

  const handleSingleClose = (id) => {
    dispatch(handleSinglephotourl(id));
  };

  return (
    <>
      {!loading ? (
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add Products</h5>
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialval}
                    validationSchema={Yup.object({
                      name: Yup.string()
                        .trim()
                        .required("Required")
                        .matches(/^[A-Za-z ]+$/, "Only letters required"),
                      regularPrice: Yup.number()
                        .required("Required")
                        // .matches(/^[0-9]+$/, "Only number"),
                        .positive()
                        .integer(),
                      price: Yup.number()
                        .required("Required")
                        .positive()
                        .integer(),
                      // .matches(/^[0-9]+$/, "Only number"),
                      description: Yup.string().required("Required"),
                      photo: Yup.mixed()
                        .required("Required")
                        .test(
                          "is-file-too-big",
                          "File exceeds 10MB",
                          (value) => {
                            // console.log(value, Array.from(value));
                            let valid = true;
                            // const files = fileRef?.current?.files;
                            // const files = values?.files;
                            if (value) {
                              const fileArr = Array.from(value);
                              fileArr.forEach((file) => {
                                const size = file?.size / 1024 / 1024;
                                if (size > 10) {
                                  valid = false;
                                }
                              });
                            }
                            return valid;
                          }
                        )
                        .test(
                          "is-file-of-correct-type",
                          "File is not of supported type",
                          (value) => {
                            let valid = true;
                            // const files = fileRef?.current?.files;
                            if (value) {
                              const fileArr = Array.from(value);
                              fileArr.forEach((file) => {
                                const type = file?.type?.split("/")[1];
                                const validTypes = [
                                  "rtf",
                                  "jpeg",
                                  "png",
                                  "jpg",
                                  "ogg",
                                  "gif",
                                ];
                                if (!validTypes.includes(type)) {
                                  valid = false;
                                }
                              });
                            }
                            return valid;
                          }
                        ),
                      category: Yup.string()
                        .oneOf(
                          category?.map((item) => {
                            return item?._id;
                          }),
                          "Invalid Category"
                        )
                        .required("Required"),
                      quantity: Yup.number()
                        .required("Required")
                        .positive()
                        .integer(),
                      // .matches(/^[0-9]+$/, "Only number"),
                      shipping: Yup.string()
                        .oneOf(
                          shippings?.map((item) => {
                            return item?.value;
                          }),
                          "Invalid"
                        )
                        .required("Required"),
                      featured: Yup.string()
                        .oneOf(
                          isfeatures?.map((item) => {
                            return item?.value;
                          }),
                          "Invalid"
                        )
                        .required("Required"),
                    })}
                    onSubmit={(values, actions) => {
                      let formData = new FormData();
                      Object.keys(values).forEach((key) => {
                        if (key === "photo") {
                          return Array.from(values.photo).map((file, index) =>
                            formData.append(key, file)
                          );
                        }
                        formData.append(key, values[key]);
                      });

                      // for (const [key, value] of formData.entries()) {
                      //   console.log(key, value);
                      // }
                      if (id) {
                        dispatch(
                          handleUpdateProduct({
                            value: formData,
                            accessToken: userToken,
                            id: id,
                          })
                        ).then((data) => {
                          if (data?.payload?.success) {
                            navigate("/dashboard/allproducts");
                          }
                        });
                        setSingleItemEdit({});
                        setAddimgmode(false);
                      } else {
                        dispatch(
                          handleCreateProduct({
                            payload: formData,
                            userToken,
                          })
                        );
                      }

                      actions.resetForm({
                        values: {
                          name: "",
                          regularPrice: "",
                          price: "",
                          description: "",
                          photo: "",
                          category: "",
                          quantity: "",
                          shipping: "",
                        },
                      });

                      fileRef.current.value = "";
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      touched,
                      values,
                      formProps,
                    }) => (
                      <>
                        <Form>
                          <CustomField
                            name="name"
                            type="text"
                            label="Product Title"
                          />
                          <CustomField
                            name="regularPrice"
                            type="number"
                            label="Regular price"
                          />
                          <CustomField
                            name="price"
                            type="number"
                            label="Price"
                          />
                          <CustomTextarea
                            name="description"
                            type="text"
                            label="Description"
                          />
                          <div className="row mb-3">
                            <label
                              htmlFor="inputText"
                              className="col-sm-2 col-form-label"
                            >
                              File Upload
                            </label>
                            <div className="col-sm-10">
                              <input
                                name="photo"
                                type="file"
                                // accept="image/*"
                                multiple
                                onChange={(event) => {
                                  setFieldValue(
                                    "photo",
                                    event.currentTarget.files
                                  );
                                  setAddimgmode(true);
                                }}
                                className={`form-control ${
                                  touched?.photo && errors?.photo
                                    ? "input-error"
                                    : ""
                                }`}
                                ref={fileRef}
                              />
                              {touched?.photo && errors?.photo && (
                                <div className="text-danger">
                                  {errors?.photo}
                                </div>
                              )}
                              {values.photo && addimgmode && (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "8px",
                                    marginTop: "10px",
                                  }}
                                >
                                  {/* {id
                               ? values?.photo?.map((item, index) => (
                                   <PreviewImage file={item} />
                                 ))
                               : Array.from(values.photo).map(
                                   (item, index) => (
                                     <PreviewImage file={item} />
                                   )
                                 )} */}

                                  {Array.from(values.photo).map(
                                    (item, index) => (
                                      <PreviewImage file={item} />
                                    )
                                  )}
                                </div>
                              )}

                              {photourl &&
                                photourl.length > 0 &&
                                !addimgmode && (
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "8px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    {photourl?.map((item, index) => (
                                      <PreviewImage
                                        file={item}
                                        handleSingleClose={handleSingleClose}
                                      />
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                          <CustomSelect name="category" label="Category">
                            <option value="" disabled>
                              Select Category
                            </option>
                            {category.map((item, indx) => {
                              return (
                                <>
                                  <option value={item?._id} key={indx + 1}>
                                    {item?.name}
                                  </option>
                                </>
                              );
                            })}
                          </CustomSelect>
                          <CustomField
                            name="quantity"
                            type="number"
                            label="Quantity"
                          />
                          <CustomSelect name="shipping" label="Shipping">
                            <option value="" disabled>
                              Select shipping option
                            </option>
                            {shippings.map((item, indx) => {
                              return (
                                <>
                                  <option value={item?.value} key={indx + 1}>
                                    {item?.title}
                                  </option>
                                </>
                              );
                            })}
                          </CustomSelect>

                          <CustomSelect name="featured" label="Isfeatured">
                            <option value="" disabled selected>
                              Select an option
                            </option>
                            {isfeatures.map((item, indx) => {
                              return (
                                <>
                                  <option value={item?.value} key={indx + 1}>
                                    {console.log(item.value)}
                                    {item?.title}
                                  </option>
                                </>
                              );
                            })}
                          </CustomSelect>
                          <div className="row mb-3">
                            <div className="col-sm-10">
                              {loading ? (
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  disabled
                                >
                                  <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Loading...
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  {id ? "Update product" : "Submit"}
                                </button>
                              )}
                            </div>
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Addproductloader />
      )}
    </>
  );
};

export default CreateProduct;
