// react
import { lazy } from 'react'

// pages
const Layout = lazy(() => import("../pages/Layout"));
const Login = lazy(() => import("../pages/Login"));
const Box = lazy(() => import("../pages/Box"));
const Users = lazy(() => import("../pages/Users"));
const Products = lazy(() => import("../pages/Products"));
const Remissions = lazy(() => import("../pages/Remissions"));
const NotFound = lazy(() => import("../pages/NotFound"));

// roles acccess by environments
const ADMIN = import.meta.env.VITE_ROLE_ADMIN;
const USER = import.meta.env.VITE_ROLE_USER;
const ROOT = import.meta.env.VITE_ROLE_ROOT;

// icons
import { FaHome, FaUserAlt, FaProductHunt, FaMoneyCheckAlt } from "react-icons/fa"

// export routes
const routers = [
  {
    path: "/",
    element: <Layout />,
    // it will pass th routers prop to Layout
    //genRoutersProp: true,
    // it will pass the authRouters prop to Layout, you can use it to generate menus
    genAuthRoutersProp: true,
    auth: [ADMIN, USER, ROOT],
    barside: false,
    children: [
      {
        element: <Box />,
        auth: [ADMIN, ROOT],
        index: true,
        path: "/",
        name: "home",
        barside: true,
        icon: <FaHome />
      },
      {
        path: "/users",
        element: <Users />,
        auth: [ADMIN, USER, ROOT],
        name: "usuarios",
        barside: true,
        icon: <FaUserAlt />
      },
      {
        path: "/products",
        element: <Products />,
        auth: [ADMIN, ROOT],
        name: "productos",
        barside: true,
        icon: <FaProductHunt />
      },
      {
        path: "/remissions",
        element: <Remissions />,
        auth: [ADMIN, ROOT],
        name: "remisiones",
        barside: true,
        icon: <FaMoneyCheckAlt />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "*", element: <NotFound /> },
];

export default routers;