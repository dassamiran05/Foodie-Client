import "./App.css";
// import Header from "./components/Header/Header";
import {
  // Route,
  RouterProvider,
  // Routes,
  createBrowserRouter,
  // useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/color.css";
import "./assets/css/responsive.css";
import Home from "./pages/Home/Home";
// import Footer from "./components/Footer/Footer";
import Menu from "./pages/menu/Menu";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/productdetails/ProductDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Ourblog from "./pages/ourblog/Ourblog";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import Aboutpage from "./pages/about/Aboutpage";
import Contactus from "./pages/contact/Contactus";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import CreateProduct from "./pages/admin/CreateProduct";
import Dashboard from "./pages/admin/Dashboard";
import Main from "./layout/Main";
import DashboardLayout from "./layout/DashboardLayout";
import ErrorCompo from "./pages/error/ErrorCompo";
import Notfound from "./pages/error/Notfound";
import Dsahboardnotfound from "./pages/error/Dsahboardnotfound";
import Createcategory from "./pages/admin/Createcategory";
import Allcategories from "./pages/admin/Allcategories";
import Allproducts from "./pages/admin/Allproducts";
import Profile from "./pages/profile/Profile";
import Alluser from "./pages/admin/Alluser";
import Addcoupon from "./pages/admin/Addcoupon";
import Allcoupon from "./pages/admin/Allcoupon";
import Cancel from "./pages/payment/Cancel";
import Succss from "./pages/payment/Succss";
import AllOrders from "./pages/admin/AllOrders";
import CategoryProducts from "./pages/categoryProduct/CategoryProducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      // loader: rootLoader,
      errorElement: <ErrorCompo />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/checkout",
              element: <Checkout />,
            },
          ],
        },
        { path: "/", element: <Home /> },
        { path: "/menu", element: <Menu /> },
        { path: "/products", element: <Products /> },
        { path: "/productdetail/:id", element: <ProductDetail /> },
        { path: "/cart", element: <Cart /> },
        { path: "/ourblog", element: <Ourblog /> },
        { path: "/blogdetails", element: <BlogDetails /> },
        { path: "/about", element: <Aboutpage /> },
        { path: "/contact", element: <Contactus /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/payment/success", element: <Succss /> },
        { path: "/payment/cancel", element: <Cancel /> },
        { path: "/products/:category", element: <CategoryProducts /> },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      ),
      // loader: rootLoader,
      children: [
        { path: "/dashboard/home", element: <Dashboard /> },
        { path: "/dashboard/addproduct", element: <CreateProduct /> },
        { path: "/dashboard/addcategory", element: <Createcategory /> },
        { path: "/dashboard/allcategories", element: <Allcategories /> },
        { path: "/dashboard/update/:id", element: <Createcategory /> },
        { path: "/dashboard/allproducts", element: <Allproducts /> },
        { path: "/dashboard/allusers", element: <Alluser /> },
        { path: "/dashboard/updateproduct/:id", element: <CreateProduct /> },
        { path: "/dashboard/profile", element: <Profile /> },
        { path: "/dashboard/addcoupon", element: <Addcoupon /> },
        { path: "/dashboard/allcoupons", element: <Allcoupon /> },
        { path: "/dashboard/orders", element: <AllOrders /> },
        {
          path: "*",
          element: <Dsahboardnotfound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
