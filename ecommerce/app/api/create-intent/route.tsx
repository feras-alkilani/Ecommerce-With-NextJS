import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16"
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const amount = Number(data.amount);

    // تحويل المبلغ إلى سنتات بشكل صحيح
    const amountInCents = Math.round(amount * 100);

    if (amountInCents <= 0) {
      throw new Error("Amount must be a positive number");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "USD"
    });

    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
