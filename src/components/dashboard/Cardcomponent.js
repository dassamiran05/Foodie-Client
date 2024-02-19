import React from "react";
// import { IoCartOutline } from "react-icons/io5";
import Dfilter from "../../pages/admin/shared/Dfilter";
import { useSelector } from "react-redux";
import GetdataLoader from "../../pages/admin/shared/GetdataLoader";

const Cardcomponent = ({
  title,
  selectedtag,
  setSelectedTag,
  icon,
  type,
  data = 0,
}) => {
  const { loading: soldloading } = useSelector((state) => state.sales);
  return (
    <div className={`card info-card ${type}`}>
      {soldloading ? (
        <GetdataLoader />
      ) : (
        <>
          <Dfilter selectedtag={selectedtag} setSelectedTag={setSelectedTag} />
          <div className="card-body">
            <h5 className="card-title">
              {title} <span>| {selectedtag}</span>
            </h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                {icon}
              </div>
              <div className="ps-3">
                <h6>
                  {type === "revenue-card" ? "$" : ""}
                  {data}
                </h6>
                <span className="text-success small pt-1 fw-bold">12%</span>{" "}
                <span className="text-muted small pt-2 ps-1">increase</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cardcomponent;
