import React from "react";
import Herobanner from "../../components/Heroslider/Herobanner";
import About from "../../components/aboutSection/About";
import Discovermenu from "../../components/discoverMenu/Discovermenu";
import ReserveTable from "../../components/reservetable/ReserveTable";
import Shopsection from "../../components/shopsection/Shopsection";
import Deal from "../../components/deal/Deal";
import Testimonials from "../../components/testimonials/Testimonials";
import Blog from "../../components/blog/Blog";
import { useSelector } from "react-redux";
import usePathname from "../../utils/usePathname";
import Loader from "../../components/loader/Loader";
// import Loader from "../../components/loader/Loader";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = usePathname();

  return (
    <React.Fragment>
      <Loader />
      <Herobanner />
      <About />
      <Discovermenu />
      {userInfo?.role !== 1 && <ReserveTable />}
      <Shopsection />
      <Deal />
      <Testimonials />
      <Blog />
    </React.Fragment>
  );
};

export default Home;
