import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, price, quantity, size, user_id } = await req.json();
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET });
  if (token) {
    try {
      const paymentIntents = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        metadata: {
          name: name,
          quantity: quantity,
          price: price,
          size: size,
          user_id: user_id || (token?.sub as string),
        },
        description: `${name} - Size: ${size}`,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: name,
                description: `${name} - Size: ${size}`,
                metadata: {
                  size: size,
                  name: name,
                  quantity: quantity,
                  price: price,
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

      return NextResponse.json({ ok: true, sessionId: session.id });
    } catch (err) {
      return NextResponse.json({
        ok: false,
        message: err instanceof Error ? err.message : "Unknown error",
      });
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
