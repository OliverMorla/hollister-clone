import Cors from "micro-cors";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
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
