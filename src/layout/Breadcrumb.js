import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <div className="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol className="breadcrumbAdmin">
          {paths.map((path) => {
            return (
              <>
                <li className="breadcrumbAdmin-item">{path.name}</li>
              </>
            );
          })}
          {/* <li className="breadcrumbAdmin-item">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="breadcrumbAdmin-item active">Dashboard</li> */}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
