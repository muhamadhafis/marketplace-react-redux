import { CartItem } from "@/components/CartItem";
import { SignedInPage } from "@/components/guard/SignedInPage";

function CartPage() {
  return (
    <SignedInPage>
      <main className="h-full-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <div className="mt-10">
          <div className="grid grid-col-12 gap-8 my-8">
            <div className="flex flex-col col-span-7 gap-6">
              <CartItem
                productName="Kaos FINALDANCE Maroon Classic"
                price={102000}
                imageUrl="https://erigostore.co.id/cdn/shop/files/New-Gita-Front-1.jpg?v=1749524871&width=1100"
              />
            </div>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
}

export default CartPage;
