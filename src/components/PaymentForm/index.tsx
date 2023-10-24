import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const PaymentForm = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { sessionId } = await response.json();

    const session = await stripe?.redirectToCheckout({
      sessionId,
    });

    console.log(session);
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default PaymentForm;
