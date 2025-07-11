import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmark } from "react-icons/io5";

export const CartItem = (props) => {
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
          <Button variant={"ghost"} size={"icon"}>
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="font-bold text-lg"></p>
          <Button variant={"ghost"} size={"icon"}>
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex w-full justify-between">
          <div className="flex gap-2 items-center">
            <IoCheckmark className="text-green-500 w-4 h-4" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>

          <Button className="text-destructive" variant={"link"}>
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
};
