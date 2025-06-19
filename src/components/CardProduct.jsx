import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState } from "react";

export const CardProduct = (props) => {
  const { imageUrl, productName, price, stock } = props;

  const [message, setMessage] = useState("Add to card");

  let quantity = 10;

  const addToCart = () => {
    setMessage("Added");
  };

  const incrementQuantity = () => {
    quantity += 1;
    console.log(quantity);
    alert("Ditambahkan");
  };

  const decrementQuantity = () => {
    quantity -= 2;
    console.log(quantity);
    alert("Dikurangi");
  };

  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden">
        <img className="w-full rounded-lg" src={imageUrl} />
      </div>
      <div>
        <p className="text-md">{productName}</p>
        <p className="text-xl font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-muted-foreground">In Stock : {stock}</p>
      </div>
      <div>
        {/* Button quantity */}
        <div className="flex justify-between items-center">
          <Button
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
        <Button onClick={() => addToCart()} className={"w-full mt-2"}>
          {message}
        </Button>
      </div>
    </div>
  );
};
