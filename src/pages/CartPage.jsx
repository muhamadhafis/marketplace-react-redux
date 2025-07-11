import { CartItem } from "@/components/CartItem";
import { SignedInPage } from "@/components/guard/SignedInPage";
import { useSelector } from "react-redux";

function CartPage() {
  const cartSelector = useSelector((state) => state.cart);

  return (
    <SignedInPage>
      <main className="h-full-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <div className="mt-10">
          <div className="grid grid-col-12 gap-8 my-8">
            <div className="flex flex-col col-span-7 gap-6">
              {cartSelector.items.map((cartItem) => {
                return (
                  <CartItem
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
          </div>
        </div>
      </main>
    </SignedInPage>
  );
}

export default CartPage;
