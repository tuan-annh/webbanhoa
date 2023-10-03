import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ContentJson from "../data/content.json";
import { useEffect } from "react";
import HeaderJson from "../data/headers.json";
import FooterJson from "../data//footer_list.json";
import { useDispatch, useSelector } from "react-redux";
import { ContentData, FooterData, HeaderData } from "./redux/JsonDataSlice";
import { useRoutes, Outlet, Navigate } from "react-router-dom";
import { path } from "./contanst/path";
import MainLayout from "./layout/MainLayout/MainLayout";
import HomePage from "./components/HomePage/HomePage";
import ProductList from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetail";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import PaymentPage from "./pages/PayMentPage/PaymentPage";
import { Login } from "./redux/AccountSlice";
import ProfilePage from "./pages/ProfilePage/Profile";
import Thanks from "./pages/Thanks/Thank";
import CustomerService from "./pages/CustomerService/CustomerService";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(HeaderData(HeaderJson));
    dispatch(FooterData(FooterJson));
    dispatch(ContentData(ContentJson));
    if (localStorage.getItem("user")) {
      dispatch(Login());
    }
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const elements = useRoutes([
    {
      path: path.home,
      element: <Outlet />,
      children: [
        {
          path: "",
          element: (
            <MainLayout>
              <HomePage />
            </MainLayout>
          ),
        },
        {
          path: "/:url",
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          ),
        },
        {
          path: "/:url/:id",
          element: (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          ),
        },
        {
          path: `${path.customerservice}/:urldata`,
          element: (
            <MainLayout>
              <CustomerService />
            </MainLayout>
          ),
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <ShoppingCartPage />
            </MainLayout>
          ),
        },
        {
          path: path.booknow,
          element: (
            <MainLayout>
              <Thanks />
            </MainLayout>
          ),
        },
        {
          path: path.payment,
          element: (
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          ),
        },

        {
          path: path.profile,
          element: isAuthenticated ? (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          ) : (
            <Navigate to={path.home} />
          ),
        },
      ],
    },
    {
      path: path.login,
      element: !isAuthenticated ? (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ) : (
        <Navigate to={path.home} />
      ),
    },
    {
      path: path.register,
      element: !isAuthenticated ? (
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      ) : (
        <Navigate to={path.home} />
      ),
    },
    {
      path: "*",
      element: <Navigate to={path.home} />,
    },
  ]);

  return (
    <>
      {elements}
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
      />
    </>
  );
}

export default App;
