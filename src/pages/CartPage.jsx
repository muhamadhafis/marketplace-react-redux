import { SignedInPage } from "@/components/guard/SignedInPage";

function CartPage() {
  return (
    <SignedInPage>
      <div className="flex h-full justify-center items-center font-bold tracking-tighter text-4xl">
        <p>CartPage</p>
      </div>
    </SignedInPage>
  );
}

export default CartPage;
