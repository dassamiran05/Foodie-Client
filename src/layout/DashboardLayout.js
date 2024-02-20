import React, { useEffect, useState } from "react";
import Header from "../pages/admin/shared/Header";
import Footer from "../pages/admin/shared/Footer";
import Sidebar from "../pages/admin/shared/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

// import "../assets/admin/vendor/quill/quill.snow.css";
// import "../assets/admin/vendor/quill/quill.bubble.css";
// import "../assets/admin/vendor/remixicon/remixicon.css";
import "../assets/admin/vendor/simple-datatables/style.css";
import "../assets/admin/css/style.css";
import Breadcrumb from "./Breadcrumb";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.body.style.fontFamily = '"Open Sans", sans-serif';
    return () => {
      document.body.style.fontFamily = ""; // Reset font family when component unmounts
    };
  }, []);

  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  const breadcrumbPaths = paths.map((path) => ({
    url: `/${path}`,
    name: path.charAt(0).toUpperCase() + path.slice(1).toLowerCase(),
  }));

  return (
    <>
      <Header toggle={toggle} setToggle={setToggle} />
      <Sidebar toggle={toggle} setToggle={setToggle} />
      <main id="main" className={`main ${toggle ? "togglemain" : ""}`}>
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DashboardLayout;
