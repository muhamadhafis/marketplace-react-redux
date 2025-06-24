import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import CardPage from "./pages/CardPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagmentPage from "./pages/admin/ProductManagmentPage";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CardPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />
        <Route path="/admin/products" Component={ProductManagmentPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
