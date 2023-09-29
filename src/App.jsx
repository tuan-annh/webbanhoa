import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ContentJson from "../data/content.json";
import { useEffect } from "react";
import HeaderJson from "../data/headers.json";
import FooterJson from "../data//footer_list.json";
import { useDispatch } from "react-redux";
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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(HeaderData(HeaderJson));
    dispatch(FooterData(FooterJson));
    dispatch(ContentData(ContentJson));
  }, [dispatch]);

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
          path: path.cart,
          element: (
            <MainLayout>
              <ShoppingCartPage />
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
      ],
    },
    {
      path: path.login,
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ),
    },
    {
      path: path.register,
      element: (
        <MainLayout>
          <RegisterPage />
        </MainLayout>
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
