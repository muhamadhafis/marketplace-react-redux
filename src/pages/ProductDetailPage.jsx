import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  // 1. dapet ID
  // 2. fetch product berdasar ID
  // 3. masukin product ke state
  // 4. tampilin data state ke ui

  // 1.
  const params = useParams();

  const [quantity, setQuantity] = useState(0);
  // 3.
  const [product, setProduct] = useState({
    id: 0,
    productName: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });
  const [productIsLoading, setProductIsLoading] = useState(true);

  // 2.
  const fetchProduct = async () => {
    try {
      setProductIsLoading(true);
      const response = await axiosInstance.get("/products/" + params.productId);
      // 4.
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setProductIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4">
      <div className="grid grid-cols-2 gap-8">
        {productIsLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img src={product.imageUrl} alt="" className="w-full rounded-4xl" />
        )}
        <div className="flex flex-col gap-1 justify-center">
          {productIsLoading ? (
            <Skeleton className="h-8 w-1/2 mt-2" />
          ) : (
            <h1 className="text-xl">{product.productName}</h1>
          )}
          {productIsLoading ? (
            <Skeleton className="h-12 w-1/4 mt-2" />
          ) : (
            <h3 className="text-3xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </h3>
          )}
          {productIsLoading ? (
            <Skeleton className="h-32 w-full mt-2" />
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellat, voluptates! Quam molestias repellendus perspiciatis
              consectetur voluptatum aspernatur explicabo aliquam non.
            </p>
          )}
          <div className="flex items-center gap-8 mt-6">
            <Button size={"lg"} variant={"ghost"}>
              <IoIosRemove className="w-6 h-6" />
            </Button>
            <p className="text-lg font-bold">{quantity}</p>
            <Button size={"lg"} variant={"ghost"}>
              <IoIosAdd className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button className={"w-sm"} size={"lg"}>
              Add to cart
            </Button>
            <Button size={"lg"} variant={"ghost"}>
              <IoHeartOutline className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductDetailPage;
