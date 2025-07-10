import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagmentPage from "./pages/admin/ProductManagmentPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import CounterPage from "./pages/CounterPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosInstance } from "./lib/axios";
import CartPage from "./pages/CartPage";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");
      if (!currentUser) return;

      const userResponse = await axiosInstance.get("/users/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (!isHydrated) return <div>Loading...</div>;

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/counter" Component={CounterPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />

        <Route path="/admin">
          <Route path="products" Component={ProductManagmentPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
