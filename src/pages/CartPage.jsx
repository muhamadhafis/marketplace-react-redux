import { CartItem } from "@/components/CartItem";
import { SignedInPage } from "@/components/guard/SignedInPage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cardService";
import { useSelector } from "react-redux";

function CartPage() {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);

  const handleCheckout = async () => {
    for (let i = 0; i < cartSelector.items.length; i++) {
      const cartCurrentItem = cartSelector.items[i];

      if (cartCurrentItem.quantity > cartCurrentItem.product.stock) {
        alert("Stock not enough");
        return;
      }
    }

    const totalPrice = cartSelector.items.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
    const tax = totalPrice / 10;

    await axiosInstance.post("/transactions", {
      userId: userSelector.id,
      totalPrice,
      tax,
      transactionDate: new Date(),
      items: cartSelector.items,
    });
    alert("Transaction successfull");

    cartSelector.items.forEach(async (cartItem) => {
      await axiosInstance.patch("/products/" + cartItem.productId, {
        stock: cartItem.product.stock - cartItem.quantity,
      });
    });

    cartSelector.items.forEach(async (cartItem) => {
      await axiosInstance.delete("/carts/" + cartItem.id);
    });

    fetchCart(userSelector.id);
  };

  return (
    <SignedInPage>
      <main className="h-full-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <div className="mt-10">
          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="flex flex-col col-span-7 gap-6">
              {cartSelector.items.map((cartItem) => {
                return (
                  <CartItem
                    keu={cartItem.id}
                    productName={cartItem.product.productName}
                    price={cartItem.product.price}
                    imageUrl={cartItem.product.imageUrl}
                    stock={cartItem.product.stock}
                    quantity={cartItem.quantity}
                    cartId={cartItem.id}
                  />
                );
              })}
            </div>

            <Card className={"col-span-5 bg-gray-50 border-0 h-min"}>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className={"flex pb-4 justify-between border-b"}>
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span>
                    Rp{" "}
                    {cartSelector.items
                      .reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>

                <div className={"flex py-4 justify-between border-b"}>
                  <span className="text-sm text-muted-foreground">
                    Taxes (10%)
                  </span>
                  <span>
                    Rp{" "}
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) / 10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </CardContent>
              <CardFooter className={"flex flex-col gap-6"}>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-muted-foreground">
                    Order Total
                  </span>
                  <span className="font-semibold">
                    Rp{" "}
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) +
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) /
                        10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>

                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
}

export default CartPage;
