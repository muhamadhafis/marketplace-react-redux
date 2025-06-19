import "./App.css";
import { Box } from "./components/Box";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { CardProduct } from "./components/CardProduct";

const productsRaw = [
  {
    productName: "Kaos FINALDANCE Coklat Spesial",
    price: 100000,
    stock: 3,
    imageUrl:
      "https://erigostore.co.id/cdn/shop/files/New-Gita-Front-1.jpg?v=1749524871&width=1100",
  },
  {
    productName: "Kaos FINALDANCE Biru Spesial",
    price: 120000,
    stock: 0,
    imageUrl:
      "https://erigostore.co.id/cdn/shop/files/New-Oniel-Front.jpg?v=1749525060&width=1100",
  },
];

function App() {
  const products = productsRaw.map((product) => {
    return (
      <CardProduct
        productName={product.productName}
        price={product.price}
        stock={product.stock}
        imageUrl={product.imageUrl}
      />
    );
  });
  return (
    <>
      <Header />
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4">
        <div className="flex items-center text-center justify-center flex-col max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tighter">
            Become a trend-setter with us.
          </h1>
          <p className=" mt-4 text-m4 text-muted-foreground">
            Sandi proves you the best products in the market at the best price
            for you to buy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">{products}</div>
      </main>
      <Footer />
    </>
  );
}

export default App;
