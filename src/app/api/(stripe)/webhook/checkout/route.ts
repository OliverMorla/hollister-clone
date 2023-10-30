import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

import Cors from "micro-cors";
import Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  console.log(signature);
  console.log(body);

  let event, user_id;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to construct event",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 400 }
    );
  }

  if (event.type === "payment_intent.created") {
    const session = await stripe.paymentIntents.retrieve(event.data.object.id);
    user_id = event.data.object.metadata.user_id;
  }

  // if order is successful
  if (event.type === "checkout.session.completed") {
    if (
      event.data.object.id &&
      event.data.object.amount_total &&
      event.data.object.customer_details?.email &&
      event.data.object.metadata?.product_id
    ) {
      const user = await prisma.users.findUnique({
        where: {
          email: event.data.object.customer_details?.email,
        },
        select: {
          user_id: true,
        },
      });

      try {
        const stripeSession = await prisma.orders.create({
          data: {
            payment_id: event.data.object.id,
            total_price: event.data.object.amount_total / 100,
            user_id: Number(user?.user_id) || Number(user_id),
            product_id: event.data.object.metadata.product_id,
          },
        });
        if (stripeSession) {
          return NextResponse.json(
            {
              ok: true,
              message: "Order successfully created",
              event: event.type,
            },
            { status: 200 }
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          return NextResponse.json({
            ok: false,
            error: "Error creating order",
            prisma_error: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }
    }
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Error creating order",
    },
    { status: 400 }
  );
}
