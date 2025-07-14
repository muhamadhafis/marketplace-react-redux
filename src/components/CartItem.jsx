import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmark, IoClose, IoTrash } from "react-icons/io5";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cardService";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const CartItem = (props) => {
  const userSelector = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(props.quantity);

  const debouncedUpdateCart = useDebouncedCallback(() => {
    updateCartQuantity();
  }, 2000);

  const removeCartItem = async () => {
    try {
      await axiosInstance.delete("/carts/" + props.cartId);
      fetchCart(userSelector.id);
      alert("Product removed from cart");
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartQuantity = async () => {
    try {
      await axiosInstance.patch("/carts/" + props.cartId, {
        quantity,
      });
      fetchCart(userSelector.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    debouncedUpdateCart();
  }, [quantity]);
  return (
    <div className="flex gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-xl max-w-52">
        <img src={props.imageUrl} alt={props.productName} className="w-full" />
      </div>

      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-col">
          <p>{props.productName}</p>
          <p className="font-bold">Rp {props.price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            disabled={quantity < 2}
            onClick={() => setQuantity(quantity - 1)}
            variant={"ghost"}
            size={"icon"}
          >
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="font-bold text-lg">{quantity}</p>
          <Button
            disabled={quantity >= props.stock}
            onClick={() => setQuantity(quantity + 1)}
            variant={"ghost"}
            size={"icon"}
          >
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex w-full justify-between">
          <div className="flex gap-2 items-center">
            {props.stock < props.quantity ? (
              <>
                <IoClose className="text-red-500 w-4 h-4" />
                <span className="text-sm text-muted-foreground">
                  Not Available
                </span>
              </>
            ) : (
              <>
                <IoCheckmark className="text-green-500 w-4 h-4" />
                <span className="text-sm text-muted-foreground">Available</span>
              </>
            )}
            <Button
              onClick={removeCartItem}
              className="text-destructive"
              variant={"link"}
            >
              <IoTrash />
              Remove Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
