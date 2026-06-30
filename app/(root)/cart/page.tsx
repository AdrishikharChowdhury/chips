import { auth } from "@/auth";

export default async function CartPage() {
  const session = await auth();
  if (!session) {
    return <p>You Must be Logged In</p>;
  }
  const cart = [];

  return (
    <div className="w-7xl min-w-full" >
      <h1 className="text-4xl font-degular-display font-extrabold">Your Cart:</h1>
      <p className="my-6 ml-2 font-light lg text-midnight-ink/60">
        Find your components here. {cart.length === 0 && "Your cart is empty"}
        {cart.length > 0 && `You have ${cart.length} items in your cart`}
      </p>
    </div>
  );
}
