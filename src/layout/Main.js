import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {

  useEffect(() => {
    document.body.style.fontFamily = "Fredoka One";
    return () => {
      document.body.style.fontFamily = ''; // Reset font family when component unmounts
    };
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
