import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import Cors from "micro-cors";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET! });
  console.log(token);

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      webhookSecret
    );

    console.log(event);

    if (event.type === "checkout.session.completed") {
      try {
        const stripeSession = await prisma.orders.create({
          data: {
            // @ts-ignore
            user_id: token.sub,
            payment_id: event.data.object.id,
            total_price: event.data.object.amount_total
              ? event.data.object.amount_total / 100
              : 0,
          },
        });

        console.log(stripeSession)
        console.log(body);
        console.log(signature);
      } catch (err) {}
      const session = event.data.object as Stripe.Checkout.Session;
      NextResponse.json(
        { ok: true, event: event.type },
        {
          status: 200,
        }
      );
    }
  } catch (err) {
    NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
