import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CardPage from "./pages/CardPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CardPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
