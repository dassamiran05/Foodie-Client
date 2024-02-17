import React from "react";

const GetdataLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "200px" }}
    >
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default GetdataLoader;
