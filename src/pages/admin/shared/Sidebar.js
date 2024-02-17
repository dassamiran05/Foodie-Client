import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const Sidebar = ({ toggle, setToggle }) => {
  return (
    <>
      <aside
        id="sidebar"
        className={`sidebar ${toggle ? "toggleSidebar" : ""}`}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard/home">
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-menu-button-wide" />
              <span>Components</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link> 
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="components-alerts.html">
                  <i className="bi bi-circle" />
                  <span>Alerts</span>
                </Link> 
              </li>
              <li>
                <Link href="components-accordion.html">
                  <i className="bi bi-circle" />
                  <span>Accordion</span>
                </Link> 
              </li>
              <li>
                <Link href="components-badges.html">
                  <i className="bi bi-circle" />
                  <span>Badges</span>
                </Link> 
              </li>
              <li>
                <Link href="components-breadcrumbs.html">
                  <i className="bi bi-circle" />
                  <span>Breadcrumbs</span>
                </Link> 
              </li>
              <li>
                <Link href="components-buttons.html">
                  <i className="bi bi-circle" />
                  <span>Buttons</span>
                </Link> 
              </li>
              <li>
                <Link href="components-cards.html">
                  <i className="bi bi-circle" />
                  <span>Cards</span>
                </Link> 
              </li>
              <li>
                <Link href="components-carousel.html">
                  <i className="bi bi-circle" />
                  <span>Carousel</span>
                </Link> 
              </li>
              <li>
                <Link href="components-list-group.html">
                  <i className="bi bi-circle" />
                  <span>List group</span>
                </Link> 
              </li>
              <li>
                <Link href="components-modal.html">
                  <i className="bi bi-circle" />
                  <span>Modal</span>
                </Link> 
              </li>
              <li>
                <Link href="components-tabs.html">
                  <i className="bi bi-circle" />
                  <span>Tabs</span>
                </Link> 
              </li>
              <li>
                <Link href="components-pagination.html">
                  <i className="bi bi-circle" />
                  <span>Pagination</span>
                </Link> 
              </li>
              <li>
                <Link href="components-progress.html">
                  <i className="bi bi-circle" />
                  <span>Progress</span>
                </Link> 
              </li>
              <li>
                <Link href="components-spinners.html">
                  <i className="bi bi-circle" />
                  <span>Spinners</span>
                </Link> 
              </li>
              <li>
                <Link href="components-tooltips.html">
                  <i className="bi bi-circle" />
                  <span>Tooltips</span>
                </Link> 
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text" />
              <span>Forms</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="forms-elements.html">
                  <i className="bi bi-circle" />
                  <span>Form Elements</span>
                </Link>
              </li>
              <li>
                <Link href="forms-layouts.html">
                  <i className="bi bi-circle" />
                  <span>Form Layouts</span>
                </Link>
              </li>
              <li>
                <Link href="forms-editors.html">
                  <i className="bi bi-circle" />
                  <span>Form Editors</span>
                </Link>
              </li>
              <li>
                <Link href="forms-validation.html">
                  <i className="bi bi-circle" />
                  <span>Form Validation</span>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Tables</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="tables-general.html">
                  <i className="bi bi-circle" />
                  <span>General Tables</span>
                </Link>
              </li>
              <li>
                <Link href="tables-data.html">
                  <i className="bi bi-circle" />
                  <span>Data Tables</span>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#charts-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-bar-chart" />
              <span>Charts</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="charts-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="charts-chartjs.html">
                  <i className="bi bi-circle" />
                  <span>Chart.js</span>
                </Link>
              </li>
              <li>
                <Link href="charts-apexcharts.html">
                  <i className="bi bi-circle" />
                  <span>ApexCharts</span>
                </Link>
              </li>
              <li>
                <Link href="charts-echarts.html">
                  <i className="bi bi-circle" />
                  <span>ECharts</span>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-gem" />
              <span>Icons</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link> 
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="icons-bootstrap.html">
                  <i className="bi bi-circle" />
                  <span>Bootstrap Icons</span>
                </Link> 
              </li>
              <li>
                <Link href="icons-remix.html">
                  <i className="bi bi-circle" />
                  <span>Remix Icons</span>
                </Link> 
              </li>
              <li>
                <Link href="icons-boxicons.html">
                  <i className="bi bi-circle" />
                  <span>Boxicons</span>
                </Link> 
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-heading">Pages</li> */}
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/addproduct">
              <IoIosAddCircleOutline />
              <span>Add Product</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/allproducts">
              <TbCategory />
              <span>All Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/addcategory">
              <IoIosAddCircleOutline />
              <span>Add Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/allcategories">
              <TbCategory />
              <span>All Categories</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/allusers">
              <TbCategory />
              <span>All Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/addcoupon">
              <IoIosAddCircleOutline />
              <span>Add Coupon</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/allcoupons">
              <TbCategory />
              <span>All Coupon</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/orders">
              <TbCategory />
              <span>All Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/dashboard/profile">
              <CgProfile />
              <span>Profile</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-faq.html">
              <i className="bi bi-question-circle" />
              <span>F.A.Q</span>
            </Link> 
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-contact.html">
              <i className="bi bi-envelope" />
              <span>Contact</span>
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-register.html">
              <i className="bi bi-card-list" />
              <span>Register</span>
            </Link> 
          </li>
          <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-login.html">
              <i className="bi bi-box-arrow-in-right" />
              <span>Login</span>
            </Link> 
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-error-404.html">
              <i className="bi bi-dash-circle" />
              <span>Error 404</span>
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link collapsed" href="pages-blank.html">
              <i className="bi bi-file-earmark" />
              <span>Blank</span>
            </Link> 
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
