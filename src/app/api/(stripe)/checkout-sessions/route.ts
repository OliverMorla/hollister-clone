import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const {
    name,
    price,
    quantity,
    size,
    items,
    color,
    product_id,
  }: {
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    product_id: string;
    items: CartItemsProps[];
  } = await req.json();

  if (user) {
    if (name || price || quantity || size || product_id || color) {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: user.email!,
          metadata: {
            name: name,
            size: size,
            color: color,
            price: price,
            quantity: quantity,
            product_id: product_id,
            user_email: user.email!,
          },

          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: name,
                  description: `${name} - Size: ${size} - Color: ${color}`,
                  metadata: {
                    name: name,
                    size: size,
                    color: color,
                    price: price,
                    quantity: quantity,
                    product_id: product_id,
                    user_email: user.email!,
                  },
                },
                unit_amount: price * 100,
              },
              quantity: quantity,
            },
          ],
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/failed`,
        });

        return NextResponse.json({
          ok: true,
          sessionId: session.id,
          message: "Stripe checkout session created!",
        });
      } catch (err) {
        return NextResponse.json(
          {
            ok: false,
            message: "Failed to create checkout session",
            error: err instanceof Error ? err.message : "Unknown error",
          },
          {
            status: 400,
          }
        );
      }
    }

    if (items.length > 0) {
      try {
        const cart = <Stripe.Checkout.SessionCreateParams.LineItem[]>[];
        let product_ids: any = {};

        items.map((item) => {
          cart.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                description: `${item.name} - Size: ${item.size}`,
                metadata: {
                  size: item.size,
                  name: item.name,
                  color: item.color,
                  quantity: item.quantity,
                  price: item.price,
                  user_email: user.email!,
                  product_id: product_id,
                },
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          });
        });

        items.forEach((item, index) => {
          product_ids[index] = item.id;
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: user.email!,
          metadata: {
            name: name,
            quantity: quantity,
            color: color,
            price: price,
            size: size,
            user_email: user.email!,
            product_id: JSON.stringify(product_ids),
          },
          line_items: cart,
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment/failed`,
        });

        return NextResponse.json({ ok: true, sessionId: session.id });
      } catch (err) {
        return NextResponse.json({
          ok: false,
          message: "Failed to create checkout session",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }
  }
  return NextResponse.json(
    {
      ok: false,
      message: "You must be logged in to make a purchase!",
    },
    { status: 401 }
  );
}
