import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (session?.user) {
      if (
        product_id !== "" &&
        quantity !== 0 &&
        price !== 0 &&
        name !== "" &&
        size !== "" &&
        color !== "" &&
        items === undefined
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
      } else if (items) {
        const res = await fetch("/api/checkout-sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
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
        alert("Please select a product to continue");
      }
    } else {
      alert("Please login to continue");
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
