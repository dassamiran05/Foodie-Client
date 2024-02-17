import React from "react";
import Skeleton from "@mui/material/Skeleton";

const Addproductloader = () => {
  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={130} height={30} className="my-2"/>

              <div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                {/* <CustomSelect name="category" label="Category">
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
                </CustomSelect> */}
                {/* <CustomField name="quantity" type="number" label="Quantity" /> */}
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div htmlFor="inputText" className="col-sm-2">
                    <Skeleton variant="text" height={25} width={90} />
                  </div>
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" height={40} />
                  </div>
                </div>
                {/* <CustomSelect name="shipping" label="Shipping">
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
                </CustomSelect> */}
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <Skeleton variant="rectangular" width={100} height={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addproductloader;
