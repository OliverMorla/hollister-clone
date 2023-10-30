import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentForm = ({
  product_id,
  quantity,
  price,
  name,
  size,
  items,
  color,
}: {
  product_id?: string;
  quantity?: number;
  price?: number;
  name?: string;
  size?: string;
  color?: string;
  items?: CartItemsProps[];
}) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (
      product_id !== "" &&
      quantity !== 0 &&
      price !== 0 &&
      name !== "" &&
      size !== "" &&
      color !== ""
    ) {
      const res = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          quantity,
          price,
          name,
          size,
          items,
          color,
        }),
      });

      const { sessionId, ok, message } = await res.json();

      if (!ok) {
        alert(message);
      } else {
        const session = await stripe?.redirectToCheckout({
          sessionId,
        });
      }
    } else {
      alert ("Please make sure you have selected a product and a size")
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-[--blue-light] text-white font-bold p-4 rounded-3xl hover:bg-[--blue-smooth] transition-colors ease-in-out "
    >
      Checkout
    </button>
  );
};

export default PaymentForm;
