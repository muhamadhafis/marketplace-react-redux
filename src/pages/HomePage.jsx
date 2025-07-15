import { Button } from "@/components/ui/button";
import "../App.css";
import { CardProduct } from "../components/CardProduct";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";

function HomePage() {
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productsList = products.map((product) => {
    return (
      <CardProduct
        id={product.id}
        productName={product.productName}
        price={product.price}
        stock={product.stock}
        imageUrl={product.imageUrl}
      />
    );
  });

  const fetchProducts = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setProductIsLoading(false);
    }
  };

  // fetch product data once, when home page is first mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-12">
        <div className="flex items-center text-center justify-center flex-col max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tighter">
            Become a trend-setter with us.
          </h1>
          <p className=" mt-4 text-m4 text-muted-foreground">
            Sandi proves you the best products in the market at the best price
            for you to buy.
          </p>
        </div>
        {productIsLoading ? (
          <div className="p-4 border rounded-2xl md:max-w-96 flex flex-col gap-4 mt-12">
            <div className="aspect-square w-full overflow-hidden">
              <Skeleton className="aspect-square w-full overflow-hidden" />
            </div>
            <div>
              <Skeleton className="h-6 w-50" />
              <Skeleton className="h-8 w-30 mt-2" />
              <Skeleton className="h-4 w-20 mt-2" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-12">{productsList}</div>
        )}
      </main>
    </>
  );
}

export default HomePage;
