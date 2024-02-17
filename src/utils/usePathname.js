import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  startLoading,
  stopLoading,
} from "../redux/features/globalLoader/loaderSlice";

const usePathname = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(startLoading());

    const timeId = setTimeout(() => {
      dispatch(stopLoading());
    }, 1500);

    return () => clearTimeout(timeId);
  }, [dispatch, location.pathname]);

  return pathname;
};

export default usePathname;
