import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "@/lib/axios";

export const CardProduct = (props) => {
  const { imageUrl, productName, price, stock, id } = props;

  const [quantity, setQuantity] = useState(0);

  const userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelector.id,
          _embed: "product",
        },
      });

      dispatch({
        type: "CART_GET",
        payload: cartResponse.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    if (!userSelector.id) {
      alert("Please login first");
      return;
    }

    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelector.id,
          _embed: "product",
        },
      });

      const existingProduct = cartResponse.data.find((cart) => {
        return cart.productId === id;
      });

      if (!existingProduct) {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: id,
          quantity,
        });
      } else {
        if (
          existingProduct.quantity + quantity >
          existingProduct.product.stock
        ) {
          alert("Stock not enough");
          return;
        }

        await axiosInstance.patch("/carts/" + existingProduct.id, {
          quantity: existingProduct.quantity + quantity,
        });
      }
      alert("Product added to cart");
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 border rounded-2xl md:max-w-96 flex flex-col gap-4">
      <Link
        to={"/product/" + id}
        className="aspect-square w-full overflow-hidden"
      >
        <img className="w-full rounded-xl" src={imageUrl} />
      </Link>
      <Link to={"/product/" + id}>
        <p className="text-md">{productName}</p>
        <p className="text-xl font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-muted-foreground">In Stock : {stock}</p>
      </Link>
      <div>
        {/* Button quantity */}
        <div className="flex justify-between items-center">
          <Button
            disabled={quantity <= 0}
            onClick={() => {
              decrementQuantity();
            }}
            size={"lg"}
            variant={"ghost"}
          >
            <IoIosRemove className="w-6 h-6" />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button
            disabled={quantity >= stock}
            onClick={() => {
              incrementQuantity();
            }}
            size={"lg"}
            variant={"ghost"}
          >
            <IoIosAdd className="w-6 h-6" />
          </Button>
        </div>

        {/* Button add to cart */}
        <Button
          disabled={!Boolean(stock) || quantity <= 0}
          onClick={() => addToCart()}
          className={"w-full mt-2"}
        >
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
};
