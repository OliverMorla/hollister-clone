import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const PaymentForm = ({
  quantity,
  price,
  name,
  size,
}: {
  quantity: number;
  price: number;
  name: string;
  size: string;
}) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        price,
        name,
        size,
      }),
    });

    const { sessionId } = await response.json();
    const session = await stripe?.redirectToCheckout({
      sessionId,
    });
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-[--blue-light] text-white font-bold p-4 rounded-3xl"
    >
      Checkout
    </button>
  );
};

export default PaymentForm;
