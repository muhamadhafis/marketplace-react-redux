import { Button } from "@/components/ui/button";
import "../App.css";
import { CardProduct } from "../components/CardProduct";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  const productsList = products.map((product) => {
    return (
      <CardProduct
        productName={product.productName}
        price={product.price}
        stock={product.stock}
        imageUrl={product.imageUrl}
      />
    );
  });

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");

      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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

        <Button onClick={fetchProducts}>Fetch Products</Button>

        <div className="mt-12 grid grid-cols-2 gap-4">{productsList}</div>
      </main>
    </>
  );
}

export default HomePage;
