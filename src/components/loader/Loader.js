import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const { isLoading } = useSelector((state) => state.loader);
  return (
    <div className={`${isLoading ? "loading" : "loaded"}`}>
      <div class={`preloader`}>
        <div class="container">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
